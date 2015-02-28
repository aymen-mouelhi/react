/**
 * Created by I060307 on 28/02/2015.
 */

var data = [
    {author: "Pete Hunt", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"},
    {author: "Aymen Mouelhi", text: "Seems cool"}
];

var converter = new Showdown.converter();

var Comment = React.createClass({displayName: "Comment",
    render: function () {
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            React.createElement("div", {className: "comment"}, 
                React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
                ), 
                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
            )
        );
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                React.createElement(Comment, {author: comment.author}, 
          comment.text
                )
            );
        });
        return (
            React.createElement("div", {className: "commentList"}, 
        commentNodes
            )
        );
    }
});

var CommentForm = React.createClass({displayName: "CommentForm",
    render: function () {
        return (
            React.createElement("div", {className: "commentForm"}, 
                "Hello, world! I am a CommentForm."
            )
        );
    }
});

// tutorial1.js
var CommentBox = React.createClass({displayName: "CommentBox",
    render: function () {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments"), 
                React.createElement(CommentList, {data: this.props.data}), 
                React.createElement(CommentForm, null)
            )
        );
    }
});
React.render(
    React.createElement(CommentBox, {data: data}),
    document.getElementById('content')
);