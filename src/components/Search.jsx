

var Search = React.createClass({
	getInitialState: function(){
		return{
			summoner: ""
		}
	},
	handleChange: function(e){
		this.setState({summoner: e.target.value});
	},
	sendAjax: function(params){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://'+this.props.region+'.api.pvp.net/api/lol/'+this.props.region+'/v1.4/summoner/by-name/'+this.state.summoner+'?api_key='+this.context.key);
		xhr.send(null);

		xhr.onreadystatechange = function (){
		  var DONE = 4;
		  var OK = 200;
		  if (xhr.readyState === DONE) {
		    if (xhr.status === OK){
		      var data=JSON.parse(xhr.responseText);
		      params.addPlayer(data);
		    } else {
		      params.handleError();
		    }
		  }
		};
	},
	handleSubmit: function(e){
		if(e.charCode==13){
			this.sendAjax(this.props)			
		}
	},
	render: function(){
		return(
			<div id="search">
				<div className="input-box">
					<div className="input-form">
						<input type='text' placeholder='Enter a summoner name' onChange={this.handleChange} onKeyPress={this.handleSubmit} />
						<span>{this.props.msg}</span>
					</div>
				</div>
			</div>
		);
	}
});

Search.contextTypes = {
  key: React.PropTypes.string
};


export default Search;