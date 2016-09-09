var featured_players = [
	{p0: {name: "RNG Uzi", id: "23962243", "profileIconId": 775}},
	{p1: {name: "RNG Xiaohu", id: "39790509", "profileIconId": 909}},
	{p2: {name: "TSM Doublelift", id: "50540128", "profileIconId": 1021}},
	{p3: {name: "EDG Deft", id: "22071749", "profileIconId": 20}},
	{p4: {name: "SKT Bang", id: "7895259", "profileIconId": 1298}}
];

var Featured = React.createClass({
	showPlayer: function(a){
		this.props.showFeatured(featured_players[a]);
	},
	render: function(){
		return(
			<div id="featured">
				{featured_players.map(function(s, i){
					return(
						<FeaturedPlayer key={i} i={i} name={s[Object.keys(s)[0]].name} showPlayer={this.showPlayer} />
					);
				}, this)}
			</div>
		);
	}
});

var FeaturedPlayer = React.createClass({
	showPlayer: function(a){
		this.props.showPlayer(a);
	},
	render: function(){
		return(
			<div className={"featured-player f"+this.props.i} onClick={() => this.showPlayer(this.props.i)}>
				<div><span>{this.props.name}</span></div>
			</div>
		);
	}
})

export default Featured;