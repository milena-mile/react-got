import React,{Component} from 'react';
import ItemDetails, {Field} from '../itemDetails';
import gotService from '../../services/gotService';

export default class BooksItem extends Component {
    gotService = new gotService();

    render() {
        return (
            <ItemDetails
                itemId={this.props.bookId}
                getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='Number of Pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}