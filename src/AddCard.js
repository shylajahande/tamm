import React, { Component } from 'react'

class AddCard extends Component {
    state = {
        fields: {
            name: '',
            card_number:'',
            limit:'',
            balance: 0,
        },
        errors: {}
    }
    handleChange = (e)=>{
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }
    handleSubmit= (e)=>{
        e.preventDefault();
        if (this.formValidation()) {
            // Send data to API
            fetch(`http://localhost:5000/cards/add`, {
                method: 'post',
                body: JSON.stringify(this.state.fields),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
               console.log(data.saved);
               addTocards();
            })
            .catch(err =>{
                let errors={};
                errors["api"]= "Please run the backend"
                this.setState({
                    errors: errors
                });
            })
            const addTocards=()=>{
                this.props.addCard(this.state.fields);
                // To CLear Fileds    
                let fields = {}
                fields.name = '';
                fields.card_number= '';
                fields.limit = '';
                fields.balance= 0;
                this.setState({fields:fields})
            }
        }
    }
    formValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter your name.";
        }
        else if(!fields["name"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["name"] = "*Please enter valid name.";
        }
        if (!fields["card_number"]) {
            formIsValid = false;
            errors["card_number"] = "*Please enter your card number.";
        }
        else if (!fields["card_number"].match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["card_number"] = "*Please enter valid 10 digit card number.";
        }
        else if(!this.LuhnAlgorithm(fields["card_number"])){
            formIsValid = false;
            errors["card_number"] = "*Card Number fails Luhn 10 check. ex: 9769958290, 6864165219, 7838221492, 5322135897";
        }
        if (!fields["limit"]) {
            formIsValid = false;
            errors["limit"] = "*Please enter limit.";
        }
        else if (fields["limit"]< 0) {
            formIsValid = false;
            errors["limit"] = "*Minmum limit should be zero.";
        }

        this.setState({
            errors: errors
        });

        return formIsValid;
    }
    LuhnAlgorithm(num){
        let inputNum = num.toString();
        let sum = 0;
        let double = false;
        for (var i = inputNum.length - 1; i >= 0; i--){
            let curDigit = parseInt(inputNum.charAt(i));
            if(double){
                if((curDigit*2) > 9){
                    sum +=( curDigit*2)-9;
                }
                else{
                sum += curDigit*2;
                }
            }
            else{
            sum += curDigit;
            }
            double =!double
        }
        return (sum % 10) === 0  ? true : false;
    }
    render() {
        return (
            <div>
                <h1 className="titleCard">Credit Card System</h1>
                <h3 className="subTitle">Add</h3>
                <span className="errorMsg">{this.state.errors.api}</span>
                <form onSubmit= {this.handleSubmit} className="add-card-form">
                    <label>Name</label><br/>
                    <input type="text" name="name" value={this.state.fields.name} onChange={this.handleChange} />
                    <span className="errorMsg">{this.state.errors.name}</span>
                    <br/>
                    <label>Card Number</label><br/>
                    <input type="text" name="card_number" value={this.state.fields.card_number} onChange={this.handleChange} />
                    <span className="errorMsg">{this.state.errors.card_number}</span>
                    <br/>   
                    <label>Limit</label><br/>
                    <input type="number" name="limit" value={this.state.fields.limit} onChange={this.handleChange} />
                    <span className="errorMsg">{this.state.errors.limit}</span>
                    <br/> 
                    <input type="submit" className="button"  value="Add"/>
                </form>
            </div>
        )
    }
}
export default AddCard;