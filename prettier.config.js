const config  =  {
    singleQuote: false, // use double quote in string. "foobar" not 'foorbar'
    useTabs: true, // use tabs, not space in formatting
    parser: 'babylon', // js parser. flow does not support decorators
    bracketSpacing: false // don't use space in objects. {foo: bar}, not { foo: bar }
};


module.exports = config;