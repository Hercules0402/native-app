export const COMMANDS_LIST = [
    {
        flags: '-n, --app-name [value]',
        description: 'App name (If a name is not given, the name is got from the site else it is the given value that ' +
            'is used)'
    },
    {
        flags: '-i, --icon [value]',
        description: 'App icon (If a path is given, we use the value like icon. If the value is not a path, the icon ' +
            'is got from the site)'
    },
    { flags: '-m, --maximize', description: 'If the app should always be started maximized or not' },
    {
        flags: '-tr, --tray [value]',
        description: 'Allow app to stay in system tray. If \'start-in-tray\' is given as argument, don\'t show main ' +
            'window on first start'
    },
    { flags: '-d, --dev-tools', description: 'Disable or not developer tools' },
    { flags: '-p, --platform <value>', description: 'Target platform (\'osx\', \'mas\', \'linux\' or \'windows\')' },
    { flags: '-a, --architecture <value>', description: 'Target architecture (\'ia32\' or \'x64\')' },
    { flags: '-t, --type <value>', description: 'Target distribution format' },
    { flags: '-fq, --fast-quit', description: 'Quit app after window close (macOS only), defaults to false' },
    { flags: '-f, --fullscreen', description: 'If the app should always be started in fullscreen or not' },
    { flags: '-sm, --show-menubar', description: 'Set menubar visible or not, defaults to false' },
    { flags: '-si, --single-instance', description: 'Allow only a single instance of the application or not' },
    { flags: '-c, --clear-cache', description: 'Prevent the application from preserving cache between launches or not' },
    { flags: '-in, --insecure', description: 'Enable or not loading of insecure content, defaults to false' },
    { flags: '-hi, --hide-window-frame', description: 'Disable or not window frame and controls' },
    {
        flags: '-co, --counter',
        description: 'If the target app should use a persistent counter badge in the dock (macOS only), defaults to false'
    },
    {
        flags: '-b, --bounce',
        description: 'If the the dock icon should bounce when counter increases (macOS only), defaults to false'
    },
    { flags: '-dc, --disable-context-menu', description: 'Disable or not the context menu' },
    { flags: '-us, --user-agent <value>', description: 'Set the user agent string for the app' },
    {
        flags: '-ap, --app-version <value>',
        description: 'The release version of the application.  Maps to the `ProductVersion` metadata property on ' +
            'Windows, and `CFBundleShortVersionString` on OS X'
    },
    {
        flags: '-ac, --app-copyright <value>',
        description: 'The human-readable copyright line for the app. Maps to the `LegalCopyright` metadata property ' +
            'on Windows, and `NSHumanReadableCopyright` on OS X'
    },
    { flags: '-au, --app-author <value>', description: 'The author name of the application' },
    { flags: '-al, --app-license <value>', description: 'The license of the application' },
];
