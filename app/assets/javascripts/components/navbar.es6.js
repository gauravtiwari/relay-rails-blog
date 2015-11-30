import mui from 'material-ui';
let Toolbar = mui.Toolbar;
let ToolbarGroup = mui.ToolbarGroup;
let ToolbarTitle = mui.ToolbarTitle;
let ToolbarSeparator = mui.ToolbarSeparator;
let RaisedButton = mui.RaisedButton;
let ThemeManager = mui.Styles.ThemeManager;
let FontIcon = mui.FontIcon;
let LightRawTheme = mui.Styles.LightRawTheme;
let Colors = mui.Styles.Colors

// Define component
const NavBar = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.blueA400
    });
    this.setState({muiTheme: newMuiTheme});
  },

  render() {

    let toolbarStyles = {
      backgroundColor: 'transparent',
      maxWidth: '980px',
      padding: '0',
      margin: '0 auto'
    };

    let fontStyles = {
      paddingLeft: '0px',
      marginRight: '10px',
      color: '#333'
    };

    let toolbarTitleStyles = {
      fontSize: '16px',
      color: '#333'
    };

    let betaStyles = {
      fontSize: '11px',
      color: '#333'
    };

    return(
      <div className="nav bg-horizon">
        <div className="container">
          <Toolbar style={toolbarStyles} className="nav--toolbar">
            <ToolbarGroup key={0} float="left">
              <a href="/" className="link bold">
                <ToolbarTitle text="Blog" style={toolbarTitleStyles}  />
              </a>
              <span style={betaStyles}>BETA</span>
            </ToolbarGroup>
            <ToolbarGroup key={1} float="right">
              <FontIcon className="muidocs-icon-custom-github" style={fontStyles} hoverColor={Colors.white} />
              <a href="https://github.com/gauravtiwari/relay-rails-blog" target="_blank" className="github--link">
                <ToolbarTitle text="Code" style={toolbarTitleStyles}  />
              </a>
            </ToolbarGroup>
          </Toolbar>
        </div>
      </div>
    );
  }

});

module.exports = NavBar;
