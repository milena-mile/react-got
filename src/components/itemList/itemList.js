import React, {Component} from 'react';
import './itemList.css';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner/';
import PropTypes from 'prop-types';
import gotService from '../../services/gotService';

class ItemList extends Component {

    static defaultProps = {
        onItemSelected: () => {}
    }

    static propTypes = {
        onItemSelected: PropTypes.func
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }
    onError(status){
        this.setState({
            itemList: null,
            error: true
        })
    }
    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {data} = this.props;
        const items = this.renderItems(data);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null,
            error: false
        }

        componentDidMount() {
            getData()
                .then((data) => {
                    this.setState({
                        data,
                        error: false
                    });
                })
                .catch(() => {this.onError()});
        }

        render() {
            const {data, error} = this.state;

            if(error){
                return <ErrorMessage/>
            }

            if(!data) {
                return <Spinner/>
            }

            return <View {...this.props} data={data}/>
        }
    }
}

const {getAllCharacters} = new gotService();
export default withData(ItemList, getAllCharacters);