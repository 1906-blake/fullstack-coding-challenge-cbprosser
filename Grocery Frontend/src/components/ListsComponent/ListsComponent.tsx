import React, { Component } from 'react'
import { Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import { GroceryList } from '../../models/GroceryList';
import { groceryClient } from '../../axios/grocery-client';
import ListCard from './ListCard';

interface ListsComponentState {
    lists: GroceryList[]
    render: boolean
    cards: any[]
}

export default class ListsComponent extends Component<{}, ListsComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            lists: [],
            render: false,
            cards:[]
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

    destroyCards = () => {
        this.setState({
            cards: []
        })
    }

    createCards = () => {
        const cards = this.state.lists.map((list: GroceryList) => {
            return <ListCard list={list} forceRender={this.toggleRender} />
        })
        this.setState({
            cards
        })
    }

    componentDidUpdate = async (prevProps: any, prevState: ListsComponentState) => {
        if (this.state.render) {
            const resp = await groceryClient.get('/grocery-lists');
            this.setState({
                lists: resp.data,
                render: false
            })
        }
        if (this.state.lists !== prevState.lists) {
            this.createCards();
        }
    }

    render() {
        return (
            <Card color="light">
                <CardHeader>
                    Current Lists
                </CardHeader>
                <CardBody>
                    {this.state.cards}
                </CardBody>
            </Card>
        )
    }
}
