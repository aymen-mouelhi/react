/**
 * Created by I060307 on 01/03/2015.
 */

var converter = new Showdown.converter();

var CardCategory = React.createClass({
    render: function () {
        return (
            <div className="category">
                Card Category + icon
            </div>
        );
    }
});

var CardText = React.createClass({
    render: function () {
        return (
            <div className="text">
                Looking for 2 more persons for a volleyball game tonight
            </div>
        );
    }
});


var CardDetails = React.createClass({
    render: function () {
        return (
            <div className="details">
                Time + distance
            </div>
        );
    }
});


// Todo: Use Polymer Card + Avatar
var Card = React.createClass({
    render: function () {
        //var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="card">
                <div className="content">
                    <div className="title">Permission</div>
                    <CardCategory />
                    <CardText />
                    <CardDetails />
                </div>
            </div>
        );
    }
});

var CardsContainer = React.createClass({
    render: function () {
        var cardNodes = this.props.data.map(function (card) {
            return (
                <Card author={card.first_name}>
          {card.last_name}
                </Card>
            );
        });
        return (
            <div className="cardsContainer">
        {cardNodes}
            </div>
        );
    }
});

var Dashboard = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        // Todo: Change this to websockets
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="dashboard">
                <CardsContainer data={this.state.data} />
            </div>
        );
    }
});


// Render Dashboard
React.render(
    <Dashboard url="http://localhost:3000/cards.json"  pollInterval={2000} />,
    document.getElementById('content')
);