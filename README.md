## Estudio de uso de la nueva context api de react 16.3 como alternativa a redux


```javascript
import React from "react";


export default function initStore(store) {
    const Context = React.createContext();

    class Provider extends store {
        render(){
            return (
                <Context.Provider value={{context: this.state}}>
                    {this.props.children}
                </Context.Provider>
            )
        }
    }

    const Connect = mapStateToProps => Component => props => {
        return (
            <Context.Consumer>
                {({ context }) => {
                    let newContext = {};
                    if(mapStateToProps !== undefined){
                        newContext = mapStateToProps(context);
                    }
                    return (
                        <Component {...props} {...newContext} />
                    )
                }}
            </Context.Consumer>
        )
    };

    return {
        Provider,
        Connect
    }
}

```


## Modo de uso
* Crear una clase que sera extendida por la clase Provider de modo de tener acceso al mismo STATE y metodos.
* Luego llamar a la funcion initStore sobre la clase , lo que devolvera un Provider y un Connect

```javascript
import React from "react";
import initStore from './utils/ContextFactory';


export class MyStore extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            item: {},
            title: 'title2',
            fetchPosts: this.fetchPosts,
            createPost: this.createPost
        };
    }

    fetchPosts= ()=>{
        this.setState({
            items:[]
        })
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => {
                setTimeout(()=>{
                    this.setState({
                        items: posts
                    })
                },500);

            });
    }

    createPost= (postData)=>{
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(post => {
                let {items} = this.state;
                items.unshift(post);
                this.setState({
                    items: items,
                    title: post.title
                })
            });
    }
}

export const {Provider, Connect} = initStore(MyStore);
```

