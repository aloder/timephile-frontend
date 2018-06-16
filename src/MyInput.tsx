import React from 'react';

class MyInput extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.setState({
        value: props.value
    })
  }

  validate(value) {
      this.props
  }

  render() {
    let addedClass = "";
    const errorMessage = this.props.validate(this.state.value);
    if (errorMessage) {
      addedClass = "pt-intent-danger";
    }
    return (
      <div>
        <input
          onChange={this.props.handleChange}
          className={`pt-input ${addedClass}`}
          type={this.props.type || "text"}
          value={this.state.value || ''}
        />
        <p>{errorMessage}</p>
      </div>
    );
  }
}

interface InputProps {
    value: any;
    validate(value: any): string;
    type: string;
    handleChange(event: any): void;
}

interface InputState {
    value: any;
}
export default MyInput;