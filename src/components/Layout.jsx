var update = require('react-addons-update');
var _ = require('lodash');
import Search from './Search';
import Featured from './Featured';
import Players from './Players';

//insert your own API Key; for production
//secure properly for production with a layer between Riot's API and the user
var api_key = require('json!../apikey.json')

var Layout = React.createClass({
	getInitialState: function(){
		return{
			region: "kr",
			players: [],
			msg: ""
		}
	},
	getChildContext: function() {
	    return {key: api_key.key};
	},
	addPlayer: function(p){
		if(this.state.players.length<=10 && !_.includes(this.state.players, p)){
			this.setState({msg:"", players: update(this.state.players, {$push: [p]})});
		}else{
			this.setState({msg: "Please remove a player (max 10)"});
		};
	},
	handleError: function(){
		this.setState({msg:"The summoner is already listed or could not be found."});
	},
	closeDiv: function(p){
		this.setState({players: update(this.state.players, {$splice: [[p,1]]})});
	},
	showFeatured: function(p){
		if(!_.includes(this.state.players, p)){
			this.setState({msg:"", players: update(this.state.players, {$push: [p]})});
		}
	},
	render: function(){
		return(
			<div id="content">

				<div id="header">

					<div className="header-title">INT Carry</div>
					<div id="header-content">
						<Featured showFeatured={this.showFeatured} />
						<Search region={this.state.region} addPlayer={this.addPlayer} msg={this.state.msg} handleError={this.handleError} />
					</div>
				</div>
				<Players players={this.state.players} region={this.state.region} closeDiv={this.closeDiv} />
			</div>
		);
	}
});

Layout.childContextTypes = {
  key: React.PropTypes.string
};

export default Layout;