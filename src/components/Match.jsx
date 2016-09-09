var champions = require('json!../champions.json')

var Match = React.createClass({
	getInitialState: function(){
		return{
			champion: {},
			matchdata: {},
			playerstats: {},
			teamdamage: 0,
			teamkills: 0
		}
	},
	sendAjax: function(params){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://'+this.props.region+'.api.pvp.net/api/lol/'+this.props.region+'/v2.2/match/'+this.props.match.matchId+'?api_key='+this.context.key);
		xhr.send(null);

		xhr.onreadystatechange = function (){
		  var DONE = 4;
		  var OK = 200;
		  if (xhr.readyState === DONE) {
		    if (xhr.status === OK){
		      var data=JSON.parse(xhr.responseText);
		      params.setMatch(data.participants);
		    }
		  }
		};
	},
	setMatch: function(matchdata){
		var pstats = matchdata.find(this.getStats);
		var dmg=0;
		var kills=0;
		matchdata.forEach(function(player){
			if(pstats.teamId == player.teamId){
				dmg += player.stats.totalDamageDealtToChampions;
				kills += player.stats.kills;
			}
		});
		this.setState({matchdata: matchdata, playerstats: pstats, teamdamage: dmg, teamkills: kills});

		this.props.addStats(pstats.stats.kills, pstats.stats.deaths, pstats.stats.assists, pstats.stats.totalDamageDealtToChampions, kills, dmg);
	},
	getChampion: function(champion){
		return champion.id==this.props.match.champion
	},
	getStats: function(match){
		return match.championId==this.props.match.champion
	},
	componentDidMount: function(){
		var c = Object.keys(champions.data).map(function(k) {
		    return champions.data[k];
		});
		this.setState({champion: c.find(this.getChampion)});
		this.sendAjax(this);
	},
	stats: function(){
		return
		return(
			<div>
				(<span className={this.state.playerstats.timeline.csDiffPerMinDeltas.zeroToTen>=0 ? "pos" : "neg"} >{this.state.playerstats.timeline.csDiffPerMinDeltas.zeroToTen.toFixed(1)}</span>|
						<span className={this.state.playerstats.timeline.csDiffPerMinDeltas.tenToTwenty>=0 ? "pos" : "neg"} >{this.state.playerstats.timeline.csDiffPerMinDeltas.tenToTwenty.toFixed(1)}</span>)
			</div>
		);
	},
	matchStats: function(){
		if(!_.isEmpty(this.state.playerstats)){
			return(
				<div className="detail-stats">
					<div>{this.state.playerstats.stats.kills}/{this.state.playerstats.stats.deaths}/{this.state.playerstats.stats.assists}</div>
					<div>k%: {((this.state.playerstats.stats.kills+this.state.playerstats.stats.assists)*100/this.state.teamkills).toFixed(1)}%</div>
					<div>
						cs: {this.state.playerstats.stats.minionsKilled} 
						{this.stats()}
					</div>
					<div>dmg: {this.state.playerstats.stats.totalDamageDealtToChampions}</div>
					<div>dmg%: {(this.state.playerstats.stats.totalDamageDealtToChampions*100/this.state.teamdamage).toFixed(1)}%</div>
				</div>
			);
		}
	},
	
	render: function(){
		return(
			<div className="single-match">
				<div className="champion-name">
					<img src={'http://ddragon.leagueoflegends.com/cdn/6.18.1/img/champion/'+this.state.champion.key+'.png '} />
					{this.state.champion.name}
				</div>
				{this.matchStats()}
			</div>
		);
	}
});

Match.contextTypes = {
  key: React.PropTypes.string
};


export default Match;