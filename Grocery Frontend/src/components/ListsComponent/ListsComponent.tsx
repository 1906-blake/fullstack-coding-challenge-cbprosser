import React, { Component } from 'react'
import { Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import { GroceryList } from '../../models/GroceryList';
import { groceryClient } from '../../axios/grocery-client';
import ListCard from './ListCard';

interface ListsComponentState {
    lists: GroceryList[]
    render: boolean
}

export default class ListsComponent extends Component<{}, ListsComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            lists: [],
            render: false
        }
    }

    componentWillMount = async () => {
        const resp = await groceryClient.get('/grocery-lists');
        this.setState({
            lists: resp.data
        })
    }

    toggleRender = () => {
        this.setState({
            render: true
        })
    }

    componentDidUpdate = async () => {
        if(this.state.render) {
            const resp = await groceryClient.get('/grocery-lists');
        this.setState({
            lists: resp.data,
            render: false
        })
        }
    }

    render() {
        return (
            <Card color="light">
                <CardHeader>
                    Current Lists
                </CardHeader>
                <CardBody>
                    {this.state.lists.map((list: GroceryList) => {
                        return <ListCard list={list} forceRender={this.toggleRender} />
                    })}
                </CardBody>
            </Card>
        )
    }
}
