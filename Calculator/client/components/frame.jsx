import React from 'react';
import Screen from './screen';
import Button from './button';

class Frame extends React.Component{
    constructor(){
        super();
        this.state={
            equation:'',
            result:''
        };

        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(event){
        const value = event.target.value;
        switch(value){
            case '=':{
                const result=eval(this.state.equation).toString();
                this.setState({result});
                break;
            }
            case 'C':{
                this.setState({equation:'',result:''});
                break;
            }
            default:{
                this.setState({equation: this.state.equation+value});
                break;
            }
        }
    }

    render(){
        return (
            <div className="frame">
                <div className="calculator-title">
                    Calculator
                </div>
                <Screen equation={this.state.equation} result={this.state.result}/>
                <div className="button-row">
                    <Button label={'1'} handleClick={this.handleClick} type='input' />
                    <Button label={'2'} handleClick={this.handleClick} type='input' />
                    <Button label={'3'} handleClick={this.handleClick} type='input' />
                    <Button label={'/'} handleClick={this.handleClick} type='action' />
                </div>
                <div className="button-row">
                    <Button label={'4'} handleClick={this.handleClick} type='input' />
                    <Button label={'5'} handleClick={this.handleClick} type='input' />
                    <Button label={'6'} handleClick={this.handleClick} type='input' />
                    <Button label={'*'} handleClick={this.handleClick} type='action' />
                </div>
                <div className="button-row">
                    <Button label={'7'} handleClick={this.handleClick} type='input' />
                    <Button label={'8'} handleClick={this.handleClick} type='input' />
                    <Button label={'9'} handleClick={this.handleClick} type='input' />
                    <Button label={'+'} handleClick={this.handleClick} type='action' />
                </div>
                <div className="button-row">
                    <Button label={'0'} handleClick={this.handleClick} type='input' />
                    <Button label={'.'} handleClick={this.handleClick} type='input' />
                    <Button label={'-'} handleClick={this.handleClick} type='action' />
                </div>
                <div className="button-row">
                    <Button label={'C'} handleClick={this.handleClick} type='action' />
                    <Button label={'='} handleClick={this.handleClick} type='action' />
                </div>
            </div>
        );
    }
}

export default Frame;