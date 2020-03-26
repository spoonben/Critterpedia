import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import fishList from './fish-list';
import bugList from './bug-list';

import {getKeyLabel} from './keyMap'

class AppState {
    @observable searchText = '';
    @observable results = [];

    constructor() {
        this.results = fishList.concat(bugList)
    }

    setSearchText(text) {
        this.searchText = text;
    }

    filterResults(searchText) {
        if(!searchText){
            this.results = fishList.concat(bugList)
        }
        this.results = this.results.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
    }
}

@observer
class ListView extends React.Component<{appState: AppState}, {}> {
    render() {
        const resultsList = this.props.appState.results

        const ResultsDiv = () => (
            <>
                {resultsList.map(result => {
                    return <div className="critterCard" key={result.name + result.critterNumber}>
                        <div className="number">#{result.critterNumber}</div>
                        <div className="name">{result.name}</div>
                        <div>Location: {result.location}</div>
                        {result.shadowSize && <div>Shadow Size{result.shadowSize}</div>}
                        <div>Value: {result.value}</div>
                        <div>Time: {result.time}</div>
                        <div>Month (Hemisphere): {result.month}</div>
                    </div>
                })}
            </>
        )

        return (
            <div className="main">
                <h1>Animal Crossing Critter Search</h1>
                <input type="text" placeholder="Search By Name" onKeyUp={this.onSearch}></input>
                <ResultsDiv/>
            </div>
        );
     }

     onSearch = (e) => {
        const searchText = e.target.value
        this.props.appState.setSearchText(searchText)
        this.props.appState.filterResults(searchText)
     }
};

const appState = new AppState();
ReactDOM.render(<ListView appState={appState} />, document.getElementById('root'));
