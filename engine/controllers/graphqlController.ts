import { ProjectDefinition, debug, rootGraphqlSchema } from "../../common";
import { ProjectController } from "../../engine";
import * as _ from "lodash";
import * as fs from "fs";
import * as path from "path";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";
import { buildSchema, buildClientSchema, parse, FieldDefinitionNode } from "graphql";
import { OperationDefinitionNode, ObjectTypeExtensionNode } from "graphql/language/ast";


export class GraphqlController {

    private static readGraphqlFiles(dir: string): string[] {
        debug("read all from " + dir);
        return _.transform(fs.readdirSync(dir), (files, file: string) => {
            const p = path.join(dir, file);
            if (fs.statSync(p).isFile() && path.extname(p) === ".graphql") {
                files.push(p);
            }
        }, []);
    }

    private static getSchemas(project: ProjectDefinition): string[] {
        const funcs = ProjectController.getFunctions(project);
        const schemas = _.transform(funcs, (res, f) => {
            const p = path.join(project.rootPath, f.gqlschemaPath);
            if (!fs.existsSync(p)) {
                throw new Error("schema path \"" + p + "\" not present");
            }
            res.push(p);
        }, []);

        return schemas.length === 0 ? GraphqlController.readGraphqlFiles(project.rootPath) : schemas;
    }

    static loadSchema(project: ProjectDefinition, predefineSchema: string = ""): string {
        const schemaPaths = GraphqlController.getSchemas(project);

        return _.reduce<string, string>(schemaPaths, (res: string, file: string): string => {
            res += fs.readFileSync(file);
            return res;
        }, predefineSchema);
    }

    /**
     *
     * @param project
     * @return { }
     */
    static defineGqlFunctionsType(project: ProjectDefinition) {
        // bad solution, I think
        const parsedSchema = parse(project.gqlSchema);
        return _.transform(parsedSchema.definitions, (res, data) => {
            switch(data.kind) {
                case "ObjectTypeExtension": {
                    const extension = data as ObjectTypeExtensionNode;
                    const graphqlType = data.name.value;
                    const extendedFieldNames = GraphqlController.processFields(extension.fields);
                    extendedFieldNames.forEach(field => res[field] = graphqlType);
                }
            }
        }, {});
    }

    private static processFields(fields: FieldDefinitionNode[]): string[] {
        return _.transform(fields, (res, f) => {
            res.push(f.name.value);
        }, []);
    }

    /**
     *
     * @param project
     */
    static validateSchema(project: ProjectDefinition) {
        const schema = GraphqlController.loadSchema(project, rootGraphqlSchema());

        const res = makeExecutableSchema({
            typeDefs: schema,
            resolvers: {
                Mutation: {},
                Query: {}
            }
        });
    }
}