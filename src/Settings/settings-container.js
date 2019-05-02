import React, { Component } from 'react';
import Modal from 'react-modal';

export default class ExampleApp extends Component {
  state = { showModal: false };
    
  toggleModal = () => this.setState({ showModal: !this.state.showModal })
  
  render () {
    return (
      <div>
        <button
          className="btn btn-small"
          onClick={this.toggleModal}
          style={{ float: 'right' }}
        >
          Ø
        </button>
        <Modal 
           isOpen={this.state.showModal}
           onRequestClose={this.toggleModal}
           contentLabel="Settings Page"
           ariaHideApp={false}
           style={customStyles}
        >
          <div className="modal-header">
            <h2>Settings</h2>
            <button
              className="btn btn-small"
              onClick={this.toggleModal}
            >
              X
            </button>
          </div>
          <div className='modal-content'>
            <label>
              Style:
              <input
                type="text"
                name="style"
                onChange={this.props.change}
                value={this.props.style}
              />
            </label>
            <label>
              Zoom:
              <input
                type="number"
                name="zoom"
                onChange={this.props.change}
                value={this.props.zoom}
                min={0}
                max={22}
              />
            </label>
            <label>
              Thickness:
              <input
                type="number"
                name="thickness"
                onChange={this.props.change}
                value={this.props.thickness}
                min={1}
                max={20}
              />
            </label>
            <br /><br />
            <button
              className="btn btn-float"
              onClick={this.toggleModal}
            >
              Done
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const customStyles = {
  content : {
    border: 'none',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  overlay: {
    zIndex: 3,
  }
};
