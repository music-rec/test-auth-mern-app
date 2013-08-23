const reactToolboxVariables = {

}

module.exports = {
  plugins: {
    // don't remove 'postcss-import' and don't move it to another place, necessary for react-toolbox
    'postcss-import': {},
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables: reactToolboxVariables
        }
      }
    }
  }
}
