import React from "react";


export default function initStore(store) {
    const Context = React.createContext();

    const { Provider: ContextProvider, Consumer } = Context;

    class StoreProvider extends store {
        render(){
            return (
                <ContextProvider value={{context: this.state}}>
                    {this.props.children}
                </ContextProvider>
            )
        }
    }

    const connect = mapStateToProps => WrappedComponent => props => {
        return (
            <Consumer>
                {({ context }) => {
                    return (
                        <WrappedComponent {...props} {...mapStateToProps(context)} />
                    )
                }}
            </Consumer>
        )
    };

    return {
        Provider: StoreProvider,
        connect
    }
}


