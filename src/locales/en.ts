/**
 * Console messages for --help flag, errors, and loaders.
 */
export default {
  default: {
    '8base_new_version':
      "The new version of the 8base CLI (v{{- latestVersion }}) is already available.\nPlease update CLI to the latest version using 'yarn global add __packageFileName__@latest' or 'npm i -g __packageFileName__@latest'",

    /**
     * Shared messages
     */
    project_created_file: 'Created {{- path }} file',
    project_updated_file: 'Updated {{- path }} file',
    '8base_usage':
      'DESCRIPTION\n  The 8base Command Line Interface is a unified tool to manage your 8base workspaces services.\n\nUSAGE\n  8base <command> [OPTIONS]\n\n  Use 8base command `--help` for information on a specific command. Use 8base help topics to view a list of available help topics. The synopsis for each command shows its parameters and their usage. Optional options are shown in square brackets.',
    '8base_config_is_missing':
      "We're unable to locate any 8base.yml file! \nMake sure you’re in the root directory of your project and the 8base.yml config file is present.",
    silent_describe: 'Disable printing extra info to the console',
    mock_with_name_not_defined:
      'Mock with name {{- mockName }} for the function with name {{- functionName }} not defined',
    mock_with_name_already_defined:
      'Mock with name {{- mockName }} for the function with name {{- functionName }} already defined',
    non_8base_project_dir:
      "The current folder isn't an 8base project, so there is nothing to configure!\n\nTry to rerun this command from the root of an existing 8base project or use '8base init' to create a new project.",
    workspace_not_found:
      'Workspace not found. Try to run `8base configure` to select existing workspace for this project.',
    empty_workspaces: 'No workspaces found. Try to create a new workspace first',

    /**
     * Project info related messages
     */
    project_describe: 'Project-related commands.',
    project_info_usage: 'COMMAND\n  8base project info\n\nDESCRIPTION\n Displays the info about current project.',
    project_info_describe: 'Displays the info about current project.',
    project_info_text:
      'Workspace Id: {{-workspaceId}}\nWorkspace Name: {{-workspaceName}}\nEnvironment: {{-environment}}\nAPI Endpoint: {{-endpoint}}',

    /**
     * Whoami related messages
     */
    who_am_i_usage: 'COMMAND\n  8base whoami\n\nDESCRIPTION\n Displays the current authenticated user.',
    who_am_i_describe: 'Displays the current authenticated user.',
    who_am_i_text: 'You authenticated as {{-email}} ({{-name}}).',

    /**
     * Login related messages
     */
    login_usage:
      'COMMAND\n  8base login [OPTIONS]\n\nDESCRIPTION\n  Authenticates the command line user by letting them log into an 8base account.',
    login_describe: 'Authenticates the command line user by letting them log into an 8base account.',
    login_browser_example_command: '8base login',
    login_browser_example: '',
    login_cli_example_command: '8base login -e my@email.com -p S3cretP@ssw0rd',
    login_cli_example: '',
    login_timeout_error: 'Login time out.',
    login_in_progress: 'waiting for authentication...',
    login_password_warning:
      'Email & password login is only available if you registered using email and password authentication method. You can enable password by signing up again with the same email.',
    login_email_describe: 'User email',
    login_password_describe: 'User password',
    login_token_describe: 'API Token',

    /**
     * Describe related messages
     */
    describe_usage:
      'COMMAND\n  8base describe [name] [OPTIONS]\n\nDESCRIPTION\n  Describes your 8base project’s functions and their types through 8base.yml file.',
    describe_describe: 'Describes your 8base project’s functions and their types through 8base.yml file.',
    describe_name_describe: 'The function name to describe',
    describe_progress: 'describing...',
    describe_empty_resolvers: "You don't have resolvers",
    describe_empty_triggers: "You don't have triggers",
    describe_empty_webhooks: "You don't have webhooks",
    describe_empty_tasks: "You don't have tasks",
    describe_function_not_found: 'Function with name {{- name }} not found',

    /**
     * Deploy related messages
     */
    deploy_in_progress: 'deploying... \nStep: {{status}}\n{{message}}',
    deploy_usage:
      'COMMAND\n  8base deploy [OPTIONS]\n\nDESCRIPTION\n  Deploys project described in 8base.yml config file from your current local directory to 8base server. You must be in the root directory of your local 8base project to use this command.',
    deploy_describe:
      'Deploys project described in 8base.yml config file from your current local directory to 8base server. You must be in the root directory of your local 8base project to use this command.',
    deploy_plugins_describe: 'The list of plugins to deploy',
    deploy_mode_describe: 'Deploy mode',
    deploy_force_describe: 'You can specify force flag to deploy without prompt about Node.js version change.',
    deploy_cancelled: 'Deploy cancelled',

    /**
     * Config related messages
     */
    configure_usage:
      'COMMAND\n  8base configure [OPTIONS]\n\nDESCRIPTION\n  Allows you to select a default workspace and retrieve the API endpoint URL.',
    configure_describe: 'Allows you to select a default workspace and retrieve the API endpoint URL.',
    configure_workspace_id_describe: 'The workspace ID of the project',
    configure_workspace_host_describe: 'The workspace host of the project',
    configure_select_workspace: 'Select workspace for current project',
    configure_prevent_select_workspace: 'Workspace selection canceled',

    configure_error: "Please configure first by running '8base configure'",

    /**
     * Check related messages
     */
    check_usage:
      'COMMAND\n  8base check [OPTIONS]\n\nDESCRIPTION\n  Performs 8base inspections. If no args specified performs all inspections',
    check_describe: 'Performs 8base inspections.',
    check_views_describe: 'Verifies that all views are working correctly',
    check_invalid_views: 'The following views are broken:\n{{list}}',

    /**
     * Init related messages
     */
    init_usage:
      'COMMAND\n  8base init [name] [OPTIONS]\n\nDESCRIPTION\n  Initializes a new project with example directory structure and custom functions.',
    init_name_describe: 'The name of the project',
    init_no_dir_example_command: '8base init',
    init_with_dir_example_command: '8base init my-project',
    init_example_no_dir: 'Initializes project in current folder',
    init_example_with_dir: 'Creates new folder for initialized project',
    init_describe: 'Initializes a new project with example directory structure and custom functions.',
    init_invalid_function_type: 'Invalid function type',
    init_invalid_project_name: 'Invalid project name: {{validationMessages}}.',
    init_undefined_function_name: 'Undefined function name',
    init_incorrect_trigger: 'Incorrect trigger name. Use trigger:<TableName>:<before|after>:<create|update|delete>',
    init_functions_describe: 'List of functions',
    init_empty_describe: 'Skip examples',
    init_workspace_id_describe: 'The workspace ID of the project',
    init_workspace_host_describe: 'The workspace host of the project',
    init_select_workspace: 'What workspace does this project belong to?',
    init_prevent_select_workspace: 'Workspace selection canceled',
    init_confirm_not_empty_dir: 'Selected directory is not empty. Are you sure you want to continue?',
    init_canceled: 'Project init canceled',

    /**
     * Introspection related messages
     */

    introspection_describe: 'Getting introspection of the current environment',
    introspection_usage:
      'COMMAND\n  8base introspection [OPTIONS]\n\nDESCRIPTION\n  Getting introspection of the current environment',
    introspection_file_describe: 'Destination file',
    introspection_file_required_option_error:
      'Please specify a relative path and filename.\n\nExample: \n`8base introspection -f <EXPORT_FILE_PATH>`',
    introspection_uncompressed_describe: '"Uncompress" the file when saving (set line breaks and indents)',
    introspection_in_progress: 'Fetching environment introspection...',
    introspection_fetch_failed: 'Failed to fetch introspection',

    /**
     * Invoke related messages
     */
    invoke_usage:
      'COMMAND\n  8base invoke <name> [OPTIONS]\n\nDESCRIPTION\n  Invokes a custom function in the production workspace.',
    invoke_describe: 'Invokes a custom function in the production workspace.',
    invoke_data_json_describe: 'Input JSON',
    invoke_data_path_describe: 'Path to input JSON',
    invoke_mock_describe: 'Name of the mock request',
    invoke_function_name_describe: 'The name of the function',
    invoke_in_progress: 'invoking...',
    invoke_returns_error: '"{{- name }}" returns an error.',

    /**
     * Invoke-local related messages
     */
    invoke_local_usage:
      'COMMAND\n  8base invoke-local <name> [OPTIONS]\n\nDESCRIPTION\n  Invokes the custom function in the local development workspace.',
    invoke_local_describe: 'Invokes the custom function in the local development workspace.',
    invoke_local_data_json_describe: 'Input JSON',
    invoke_local_data_path_describe: 'Path to input JSON',
    invoke_local_mock_describe: 'Name of the mock request',
    invoke_local_function_name_describe: 'The name of the function',
    invoke_local_in_progress: 'invoking...',
    invoke_local_returns_error: '"{{- name }}" returns an error.',

    /**
     * Export related messages
     */
    export_in_progress: 'exporting...',
    export_describe: 'Exports current workspace data schema',
    export_usage:
      'COMMAND\n  8base export [OPTIONS]\n\nDESCRIPTION\n  Exports current - or specified - workspace data schema to a local file',
    export_file_describe: 'Destination file',
    export_file_required_option_error:
      'Please specify a relative path and filename for the export.\n\nExample: \n`8base export -f <EXPORT_FILE_PATH>`',
    export_workspace_describe: 'Custom workspace id',

    /**
     * Import related messages
     */
    import_usage:
      'COMMAND\n  8base import [OPTIONS]\n\nDESCRIPTION\n  Imports 8base schema file and data to the current - or specified - workspace.',
    import_describe: 'Imports 8base schema file and data to the current - or specified - workspace.',
    import_schema_in_progress: 'importing schema...',
    import_data_in_progress: 'importing data...',
    import_file_describe: 'Path to file with schema',
    import_schema_describe: 'Import schema',
    import_data_describe: 'Import data',
    import_workspace_describe: 'Custom workspace id',
    import_cant_parse_schema: "Can't parse the schema file.",
    import_file_not_exist: 'Schema file does not exist.',

    /**
     * Logout related messages
     */
    logout_error: "Please login first by running '8base login'",
    logout_usage:
      'COMMAND\n  8base logout [OPTIONS]\n\nDESCRIPTION\n  Clears local login credentials and invalidates API session.',
    logout_describe: 'Clears local login credentials and invalidates API session.',

    /**
     * Logs related messages
     */
    logs_usage: 'COMMAND\n  8base logs [OPTIONS]\n\nDESCRIPTION\n  Shows logs for the functions or migrations',
    logs_describe: 'Shows logs for the functions or migrations.',
    logs_num_describe: 'Number of lines to display',
    logs_name_deprecation: 'Name parameter is now deprecated',
    logs_tail_describe: 'Continually stream logs',
    logs_resource_describe:
      'environment:extensions - deployed custom functions logs\nsystem:ci:migration - migration process logs',
    logs_in_progress: 'getting logs...',
    logs_tail_in_progress: 'Establishing connection with server...',
    logs_tail_failed: 'Failed to establish connection... Please try again in a few minutes.',
    logs_tail_success: 'Connection established. Tailing logs...',

    /**
     * Generate related messages
     */
    generate_describe: 'Generator for server and client side resources',
    generate_mocks_describe: 'Included mocks dir and files',
    generate_syntax_describe: 'Syntax for the generated file',

    /**
     * Generate [FUNCTION] messages
     */
    function_with_name_already_defined: 'Function with name {{- name}} already defined',
    function_with_name_not_defined: 'Function with name {{- name}} not defined',
    generate_function_success:
      'Boom! Your new {{- name }} function has been successfully generated. To add any required settings, check out its configuration block in your projects 8base.yml file.',

    /**
     * Generate app related messages
     */
    generate_app_describe: 'Generates an app skeleton for a specific framework (framework availability: react)',
    generate_app_usage: '8base generate app <name>',
    generate_app_name: 'The name of the app',

    /**
     * Generate scaffold related messages
     */
    generate_scaffold_usage: '8base generate scaffold <tableName> [OPTIONS]',
    generate_scaffold_describe:
      'Generates CRUD screens for a table in a specific framework (framework availability: react)',
    generate_scaffold_table_name: 'The name of the table',
    generate_scaffold_deprecated: 'Functionality removed from the project',

    /**
     * Generate resolver related messages
     */
    generate_resolver_usage: '8base generate resolver <name> [OPTIONS]',
    generate_resolver_name: 'The name of the resolver',
    generate_resolver_describe: 'Generator for a custom resolver function.',

    /**
     * Generate tasks related messages
     */
    generate_task_usage: '8base generate task <name> [OPTIONS]',
    generate_task_name: 'The name of the task',
    generate_task_describe: 'Generator for a custom task function.',
    generate_task_schedule_describe: 'Schedule on which the task runs',

    /**
     * Generate trigger related messages
     */
    generate_trigger_usage: '8base generate trigger <tableName> [OPTIONS]',
    generate_trigger_table_name: 'The name of table to make trigger for',
    generate_trigger_describe: 'Generator for a custom trigger function.',
    generate_trigger_type_describe: 'The trigger type',
    generate_trigger_operation_describe: 'Operation that invokes the trigger',

    /**
     * Generate webhook related messages
     */
    generate_webhook_usage: '8base generate webhook <name> [OPTIONS]',
    generate_webhook_name: 'The name of the webhook',
    generate_webhook_describe: 'Generator for a custom webhook function.',
    generate_webhook_path_describe: 'Path for the url (https:<endpoint>/<path>)',
    generate_webhook_method_describe: 'HTTP verb to invoke the function ',

    /**
     * Generate webhook related messages
     */
    generate_mock_describe: '8base generate mock <name> [OPTIONS]',
    generate_mock_usage: 'Generator for a mock for the function.',
    generate_mock_function_name: 'The name of the function',
    generate_mock_name_describe: 'Name of the mock request',
    generate_mock_success: '',

    /**
     * Generate plugin related messages
     */
    generate_plugin_usage: '8base generate plugin <name> [OPTIONS]',
    generate_plugin_name: 'The name of the plugin',
    generate_plugin_describe: 'Generator for a plugin.',
    generate_plugin_success: '',

    /**
     * Package related messages
     */
    package_usage:
      'COMMAND\n  8base package [OPTIONS]\n\nDESCRIPTION\n  Package 8base application without deploying it.',
    package_describe: 'Package 8base application without deploying it.',
    package_progress: 'packaging...',

    backup_describe: 'Backup commands.',

    /**
     * Backup create related messages
     */
    backup_create_usage:
      'COMMAND\n  8base backup create [OPTIONS]\n\nDESCRIPTION\n  Creates backup (snapshot) of the currently selected environment.',
    backup_create_describe: 'Creates backup of the environment.',
    backup_create_in_progress: 'Backup in progress...',

    /**
     * Backup list related messages
     */
    backup_list_describe: 'Lists all the backups of current environment.',
    backup_list_usage: '8base backup list',

    /**
     * Backup restore related messages
     */
    backup_restore_describe: 'Restores environment from the backup.',
    backup_restore_usage: '8base backup restore [OPTIONS].',
    backup_restore_in_progress: 'Restore backup in progress...',
    backup_restore_set_environment_describe: 'Target environment name',
    backup_restore_set_backup_name_describe: 'The name of the target backup',

    environment_describe: 'Environment commands.',

    /**
     * Environment list related messages
     */
    environment_list_usage:
      'COMMAND\n  8base environment list\n\nDESCRIPTION\n  Lists all the environments of current workspace.',
    environment_list_describe: 'Lists all the environments of current workspace.',

    /**
     * Environment branch related messages
     */
    environment_branch_in_progress: 'Branch environment in progress.',
    environment_branch_usage:
      'COMMAND\n  8base environment branch\n\nDESCRIPTION\n  Creates a new branch (environment) based on your currently selected environment.',
    environment_branch_describe: 'Creates branch of the environment.',
    environment_branch_name_describe: 'Name of new environment',
    environment_branch_mode_describe: 'Branching mode',
    environment_branch_force_describe: 'You can specify force flag to branch without prompt.',
    environment_branch_canceled: 'Branch environment canceled',

    /**
     * Environment delete related messages
     */
    environment_delete_in_progress: 'Delete environment in progress.',
    environment_delete_usage: 'COMMAND\n  8base environment delete\n\nDESCRIPTION\n Deletes specified environment',
    environment_delete_describe: 'Deletes the environment.',
    environment_delete_name_describe: 'Name of environment to delete',

    /**
     * Environment set list related messages
     */
    environment_set_select_environment: 'Select environment for current project',
    environment_set_prevent_select_environment: 'Environment selection canceled',
    environment_set_doesnt_exit: "Environment '{{name}}' doesn't exist.",
    environment_set_describe: 'Allows you to set the environment of your current project',
    environment_set_usage:
      'COMMAND\n  8base environment set\n\nDESCRIPTION\n Allows you to select and set the environment of your current project',
    environment_set_environment_name_describe: 'The environment name of the project',

    migration_describe: 'Migration commands.',

    /**
     * Migration commit related messages
     */
    migration_commit_in_progress: 'Migration commit in progress',
    migration_commit_describe: 'Commits migrations and/or Custom Logic from your local project to 8base',
    migration_commit_usage:
      "COMMAND\n  8base migration commit\n\nDESCRIPTION\n  Deploys migration files from your local 'migrations' directory and/or your Custom Logic to 8base server. You must be in the root directory of your 8base project to use this command.",
    migration_commit_mode_describe: 'Commit mode.',
    migration_commit_dest_env_master: 'Environment you want to commit is Master. Are you sure you want to continue?',
    migration_commit_canceled: 'Commit canceled',
    migration_commit_file_does_not_exist: 'Migration file with name "{{name}}" doesn\'t exist',
    migration_commit_in_project_mode: "You can't specify migrations in 'ONLY_PROJECT' mode.",
    migration_commit_select_file_describe: 'You can specify the necessary migration files.',
    migration_environment_describe: 'Specify the environment you want to commit.',
    migration_force_describe: 'You can specify force flag to commit to master without prompt.',

    /**
     * Migration plan related messages
     */
    migration_generate_dist_describe: 'The folder of migrations',
    migration_generate_tables_describe: 'Specify table names to generate migrations for data.',
    migration_generate_environment_describe: `Target environment`,
    migration_generate_usage:
      "COMMAND\n  8base migration generate\n\nDESCRIPTION\n Generates migration files based on changes in your environment to your local 'migrations' directory.",
    migration_generate_describe: 'Generates local migration files based on changes in your environment',
    migration_generate_in_progress: 'Migration plan in progress...',

    /**
     * Migration status related messages
     */
    migration_status_describe: 'Displays migrations which would be committed to target environment',
    migration_status_usage:
      'COMMAND\n  8base migration status\n\nDESCRIPTION\n Shows the difference between your local migration files and any migrations which have been already committed to target environment.',
    migration_status_in_progress: 'Resolve status...',
    migration_status_environment_describe: 'Target environment',

    /**
     * Migration status related messages
     */
    environment_show_usage: 'COMMAND\n  8base environment show\n\nDESCRIPTION\n Displays current environment.',
    environment_show_describe: 'Displays currently selected environment',
    environment_show_text: 'Environment: {{-environment}}',

    node_version_local_non_exists_and_mismatch:
      'The local version of Node.js is not set in the 8base.yml file, although the runtime version on the server is different from the default. Check the latest changes in your primary branch.',
    node_version_local_and_remote_mismatch:
      'The Node.js version on the server is different from the one set locally in the 8base.yml file. It is necessary to synchronize the versions',
    node_version_synchronization_confirm: 'Confirm version synchronization?',
    node_version_synchronization_force: 'Version synchronization will happen forcefully',

    /**
     * Plugin related messages
     */
    plugin_install_describe: 'Install plugin to the project.',
    plugin_install_usage: 'COMMAND\n  8base plugin install <name>\n\nDESCRIPTION\n  Install plugin to the project.',
    plugin_install_name_describe: 'The name of the plugin',
    plugin_install_cant_find: "Can't find plugin with name {{- name }}",
    plugin_install_cant_download: "Can't download plugin with name {{- name }}",
    plugin_successfully_install: 'Plugin {{- name }} successfully installed to your project.',

    plugins_with_name_already_defined: 'Plugin with name {{- name }} already defined',

    plugin_remove_describe: 'Remove plugin from the project.',
    plugin_remove_usage: 'COMMAND\n  8base plugin remove <name>\n\nDESCRIPTION\n  Remove plugin from the project.',
    plugin_remove_name_describe: 'The name of the plugin',
    plugin_successfully_remove: 'Plugin {{- name }} successfully removed from your project.',
    plugin_remove_plugin_not_found: 'Plugin {{- name }} not found in your project.',

    plugin_list_plugin_info: 'Name: {{- name }}\nDescription: {{- description }}\nGitHub: {{- gitHubUrl }}\n',
    plugin_list_not_found_plugins: 'Not found plugins for your query',
    plugin_list_describe: 'Show list of available plugins.',
    plugin_list_usage: 'COMMAND\n  8base plugin list\n\nDESCRIPTION\n  Show list of available plugins.',

    configuration_required: `You have to configure project before execute the command.`,
    async_in_progress: 'progress... \nStep: {{- status }}\n{{- message }}',

    you_are_not_in_project: 'Current folder does not contain the 8base.yml file.',

    workspace_with_id_doesnt_exist:
      'Something went wrong, cannot get workspace with id: {{- id}}. Please contact support@8base.com if the error persists.',
  },

  /**
   * Debug related messages
   */
  debug: {
    remote_address: 'remote address: {{- remoteAddress}}',
    start_request: 'begin request',
    request_complete: 'request complete',
    reset_id_token: 'reset id token',
    set_id_token: 'set id token',
    reset_refresh_token: 'reset refresh token',
    set_email: 'set email: {{- email}}',
    set_workspace_id: 'set workspace id {{workspaceId}}',
    set_environment_name: 'set environment id {{environmentName}}',
  },
};
