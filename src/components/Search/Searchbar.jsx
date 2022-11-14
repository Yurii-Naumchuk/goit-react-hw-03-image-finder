import { Component } from 'react';
import { toast } from 'react-toastify';
import { Header, Form, Input, Button } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchImages: '',
  };

  handleNameChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchImages.trim() === '') {
      toast.warn('Enter a valid name');
    }
    this.props.onSubmit(this.state.searchImages);
    this.setState({ searchImages: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleNameChange}
            name="searchImages"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchImages}
          />
          <Button type="submit">
            <span>Search</span>
          </Button>
        </Form>
      </Header>
    );
  }
}
