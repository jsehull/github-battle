var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

class App extends React.Component {
    render() {
        return (
            <div>
                Hello React Training!
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

///////////////////////

class Badge extends React.Component {
    render() {
        return (
            <div>
                <img 
                    src={this.props.img}
                    alt='Avatar'
                    style={{width: 100, height: 100}}
                />
                <h1>Name: {this.props.name}</h1>
                <h3>username: {this.props.username}</h3>
            </div>
        )
    }
}

Badge.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired 
}
  
ReactDOM.render(
    <Badge 
        name='Tyler McGinnis'
        username='tylermcginnis'
        img='https://avatars0.githubusercontent.com/u/2933430?v=3&s=460'/>,
    document.getElementById('profile')
);

///////////////////////

class Users extends React.Component {
    render() {
        var friends = this.props.list.filter(function(user) {
            return user.friend === true;
        });
        
        var notFriends = this.props.list.filter(function(user) {
            return user.friend !== true;
        });
        
        return (
            <div>
                <h1>Friends</h1>
                <ul>
                    {friends.map(function (user) {
                        return <li key={user.name}>{user.name}</li>;
                    })}
                </ul>
                
                <hr />
                
                <h1> Non Friends </h1>
                <ul>
                    {notFriends.map(function(user) {
                        return <li key={user.name}>{user.name}</li>
                    })}
                </ul>        
            </div>
        )
    }
}

Users.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        friend: PropTypes.bool.isRequired
    }))
}

ReactDOM.render(
    <Users list={[
        { name: 'Tyler', friend: true },
        { name: 'Ryan', friend: true },
        { name: 'Michael', friend: false },
        { name: 'Mikenzi', friend: false },
        { name: 'Jessica', friend: true },
        { name: 'Dan', friend: false } ]} 
    />,
    document.getElementById('friends')
);


// - Implicit Binding
    // what is to the left of . when invoking
// this notes
// var me = {
//     name: 'Jesse',
//     age: '11',
//     sayName: function() {
//         console.log(this.name);
//     }
// };

// me.sayName();

var sayNameMixin = function(obj) {
    obj.sayName = function() {
        console.log(this.name);
    };
};

var me = {
    name: 'Tyler',
    age: 25,
    color: 'blue'
};

sayNameMixin(me);
me.sayName();



// - Explicit Binding
    // call - pass args one by one
    // apply - pass args as array 
    // bind - like call, but returns func to invoke later

var sayAge = function() {
    console.log('My age is ' + this.age);
};

sayAge.call(me);


var sayColor = function(food1, food2, food3) {
    console.log('My favorite color is ' + this.color + ' and I also eat ' + food1 + ', ' + food2 + ', ' + 'and ' + food3);
};

var foods = ['apples', 'oranges', 'lemons'];

sayColor.apply(me, foods);
////
var newFn = sayColor.bind(me, foods[0], foods[1], foods[2]);
console.log('--------');
newFn();
// binds as new function to be used later



// new Binding
    // bound to new object constructed
var Animal = function(color, name, type) {
    // this = {};
    this.color = color;
    this.name = name;
    this.type = type;
};

var zebra = new Animal('black and white', 'Zorro', 'Zebra');

// window Binding
    // not ideal, but if nothing to left of . it binds to window