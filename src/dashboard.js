/**
 * Created by I060307 on 01/03/2015.
 */

var converter = new Showdown.converter();

var Avatar = React.createClass({
    render: function() {
        return (
            <div className="user-info">
                <ProfilePic username={this.props.username} />
                <ProfileInfo username={this.props.username} category_image={this.props.category}/>
            </div>
        );
    }
});

var ProfilePic = React.createClass({
    render: function() {
        return (
            <img src={'https://graph.facebook.com/' + this.props.username + '/picture'} className="profile-img" />
        );
    }
});

var ProfileInfo = React.createClass({
    render: function() {
        return (
            <div className="info">
                <div className="username">
                    <strong className="fullname">{this.props.username}</strong>
                </div>
                <span className="screenname">
                    <a href={'https://www.facebook.com/' + this.props.username} className="screenname">
                        {this.props.username}
                    </a>
                </span>
                <Ribbon image ={this.props.category_image} />
            </div>
        );
    }
});


var Ribbon = React.createClass({
    render: function() {
        return (
            <div className="ribbon">
                <a target="_blank" href="#">
                    <img src={this.props.image} />
                </a>
            </div>
        );
    }
});


var CardHeader = React.createClass({
    render: function() {
        return (
            <Avatar username={this.props.username} category={this.props.category} />
        );
    }
});


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
            <div className="card-text">
            {this.props.text}
            </div>
        );
    }
});


var CardDetails = React.createClass({
    render: function () {
        return (
            <div className="card-footer">
                <div className="timeago">
                    <p>2 hours ago</p>
                </div>
                <div className="location">
                    <p>500m</p>
                </div>
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
                    <CardHeader username={this.props.username} category={this.props.category} />
                    <CardText text={this.props.children.toString()} />
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
                <Card username={card.user.username} category={card.category.icon} >
                    {card.text}
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