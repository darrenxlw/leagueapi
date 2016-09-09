import Player from './Player';

var Players = React.createClass({
	render: function(){
		return(
			<div id="player-list">

				{
					this.props.players.map(function(player, i){
						return(
							<Player key={i} index={i} player={player} region={this.props.region} closeDiv={this.props.closeDiv} />
						);
					}, this)
				}
			</div>
		);
	}
});



export default Players;