import React, { Component } from 'react'
import { Card, CardHeader, Collapse, CardBody, CardText, Form, Input, Row, Col, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { GroceryList } from '../../models/GroceryList';
import { GroceryItem } from '../../models/GroceryItem';
import { groceryClient } from '../../axios/grocery-client';

interface ListCardState {
    isOpen: boolean
    list: GroceryList
    inputItem: string
    inputType?: string
    cards: any[]
}

interface ListCardProps {
    list: GroceryList
    forceRender: () => any
}

export default class ListCard extends Component<ListCardProps, ListCardState> {
    constructor(props: ListCardProps) {
        super(props);

        this.state = {
            isOpen: false,
            list: new GroceryList(
                0,
                '',
                []
            ),
            inputItem: '',
            cards: []
        }
    }

    submitItem = async (event: any) => {
        event.preventDefault();
        event.currentTarget.reset();
        const resp = await groceryClient.post(`/grocery-lists/${this.props.list.id}/items`, new GroceryItem(0, this.state.inputItem, this.state.inputType));
        this.props.forceRender();
        this.updateList();
    }

    removeItem = async (event: any) => {
        const itemId = +event.currentTarget.getAttribute('id')
        await groceryClient.delete(`/grocery-lists/${this.props.list.id}/items/${itemId}`)
        this.props.forceRender();
        this.updateList();
    }

    handleToggle = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    changeItem = (event: any) => {
        this.setState({
            inputItem: event.target.value
        })
    }

    changeType = (event: any) => {
        this.setState({
            inputType: event.target.value
        })
    }
    
    updateList = () => {
        this.setState({
            list: this.props.list
        })
    }

    destroyCards = () => {
        this.setState({
            cards: []
        })
    }
    
    createCards = () => {
        const cards = this.state.list.items!.map((item: GroceryItem) => {
            return <Card key={item.id} className="mb-3" color="light">
                <CardBody className="p-0 pl-3">
                    <Row>
                        <Col>
                            <CardText className="">{item.name}, {item.type}</CardText>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button id={`${item.id}`} className="border p-0 pl-2 pr-2" color="dark" size="sm" onClick={this.removeItem}>Remove Item</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        });
        this.setState({
            cards
        })
    }

    componentDidUpdate = (prevProps: ListCardProps, prevState: ListCardState) => {
        if(this.props.list.items !== prevProps.list.items) {
            this.createCards();
        }
    }

    componentWillMount = () => {
        this.updateList();
    }

    componentDidMount = () => {
        this.createCards();
    }

    render() {
        return (
            <Card color="dark" className="mb-3" key={this.props.list.id}>
                <CardHeader>
                    <a className="text-light" href={`${this.props.list.id}`} onClick={this.handleToggle}>{this.props.list.name}</a>
                </CardHeader>
                <Collapse isOpen={this.state.isOpen}>
                    <CardBody>
                        {this.state.cards}
                        <Form onSubmit={this.submitItem}>
                            <InputGroup size="sm">
                                <Input className="bg-dark text-light" type="text" placeholder="Item" onChange={this.changeItem} />
                                <Input className="bg-dark text-light" type="text" placeholder="Type (optional)" onChange={this.changeType} />
                                <InputGroupAddon addonType="append"><Button className="border" color="dark" type="submit">Submit</Button></InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
}
