import Match from './Match';

var Player = React.createClass({
	getInitialState: function(){
		return{
			player: this.props.player[Object.keys(this.props.player)[0]],
			league: "",
			matches: [],
			totalkills: 0,
			totaldeaths: 0,
			totalassists: 0,
			totaldamage: 0,
			totalteamdamage: 0,
			totalteamkills: 0
		}
	},
	sendAjax: function(params){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://'+this.props.region+'.api.pvp.net/api/lol/'+this.props.region+'/v2.2/matchlist/by-summoner/'+this.props.player[Object.keys(this.props.player)[0]].id+'?beginIndex=0&endIndex=10&api_key='+this.context.key);
		xhr.send(null);

		xhr.onreadystatechange = function (){
		  var DONE = 4;
		  var OK = 200;
		  if (xhr.readyState === DONE) {
		    if (xhr.status === OK){
		      var data=JSON.parse(xhr.responseText);
		      params.setMatches(data.matches);
		    }
		  }
		};

		var xhr2 = new XMLHttpRequest();
		xhr2.open('GET', 'https://'+this.props.region+'.api.pvp.net/api/lol/'+this.props.region+'/v2.5/league/by-summoner/'+this.props.player[Object.keys(this.props.player)[0]].id+'/entry?api_key='+this.context.key);
		xhr2.send(null);

		xhr2.onreadystatechange = function (){
		  var DONE = 4;
		  var OK = 200;
		  if (xhr2.readyState === DONE) {
		    if (xhr2.status === OK){
		      var data=JSON.parse(xhr2.responseText);
		      params.setState({league: data[Object.keys(data)[0]][0].tier});
		    }
		  }
		};
	},
	closeDiv: function(){
		this.props.closeDiv(this.props.index);
	},
	componentDidMount: function(){
		this.sendAjax(this);
	},
	setMatches: function(m){
		this.setState({matches: m});
	},
	addStats: function(kills, deaths, assists, damage, teamkills, teamdamage){
		this.setState({
			totalkills: this.state.totalkills+kills,
			totaldeaths: this.state.totaldeaths+deaths,
			totalassists: this.state.totalassists+assists,
			totaldamage: this.state.totaldamage+damage,
			totalteamkills: this.state.totalteamkills+teamkills,
			totalteamdamage: this.state.totalteamdamage+teamdamage
		});
	},
	showMatches: function(){
		if(this.state.matches.length){
			return(
				this.state.matches.map(function(match, i){
					return(
						<Match key={i} match={match} region={this.props.region} addStats={this.addStats} />
					);
				}, this)
			);
		}
	},
	render: function(){
		return(
			<div className="player-profile">
				<i className="material-icons close-player" onClick={this.closeDiv} >clear</i>	
				<div className="match-row">
					<div className="match-total">
						<div className="profile-details">
							<img src={'http://ddragon.leagueoflegends.com/cdn/6.18.1/img/profileicon/' + this.props.player[Object.keys(this.props.player)[0]].profileIconId + '.png'} />
							{this.props.player[Object.keys(this.props.player)[0]].name}
							<div>{this.state.league}</div>
							<div className="totalstats">
								<div>{((this.state.totalkills+this.state.totalassists)/this.state.totaldeaths).toFixed(2)} KDA<span> - {this.state.totalkills}/{this.state.totaldeaths}/{this.state.totalassists}</span></div>
								<div>Killshare: {((this.state.totalkills+this.state.totalassists)*100/this.state.totalteamkills).toFixed(2)}%</div>
								<div>Damageshare: {(this.state.totaldamage*100/this.state.totalteamdamage).toFixed(2)}%</div>
							</div>
						</div>
					</div>
					{this.showMatches()}
				</div>
			</div>
		);
	}
});

Player.contextTypes = {
  key: React.PropTypes.string
};


export default Player;