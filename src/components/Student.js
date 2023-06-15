import { Component } from "react";
import { Button, IconButton, TextField, Box } from '@mui/material';
import CloseButton from '@mui/icons-material/Close';
import "react-awesome-button/dist/styles.css";
import Modal from "react-modal";
import { postStudent, getStudents } from "./StudentService";
import './Student.css';

const PRIMARY_COLOR = 'rgb(25,118,210)';

const modalStyles = {
  overlay: {
    background: 'rgba(255, 255, 255, 0.5)'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    background: '#000',
    boxShadow: '0px 0px 10px #000',
    padding: 20,
    paddingBottom: 40
  }
};

const closeButtonStyles = {
  position: 'absolute',
  top: 20,
  right: 20,
  color: '#fff',
  background: PRIMARY_COLOR,
  borderRadius: 10
}

const camelToName = (key) => {
  var result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAddStudentOpen: false,
      isListStudentsOpen: false,
      firstName: '',
      lastName: '',
      gradeType: '',
      age: '',
      gpa: '',
      allStudents: []
    };
  };
  toggleAddStudentModal = event => {
    const { isAddStudentOpen } = this.state;
    this.setState({ isAddStudentOpen: !isAddStudentOpen }); 
  };
  toggleListStudentsModal = event => {
    const { isListStudentsOpen } = this.state;
    this.setState({ isListStudentsOpen: !isListStudentsOpen }); 
  };
  componentDidMount() {
    Modal.setAppElement('.container');
    getStudents().then((result) => {
      this.setState({ allStudents: result })
    })
  };
  getInputComponent = (value, name) => {
    return (
      <TextField
        required
        id={name}
        label={camelToName(name)}
        variant="standard"
        sx={{input: {color: 'white'}}}
        style={{marginBottom: 30}}
        value={value}
        onChange={(e) => this.setState({ [name]: e.target.value })}
        focused
      />
    )
  };
  addStudent = () => {
    let data = {
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'gradeType': this.state.gradeType,
      'age': parseInt(this.state.age),
      'gpa': parseFloat(this.state.gpa)
    };
    postStudent(data);
  };
  render() {
    const { isAddStudentOpen } = this.state;
    const { isListStudentsOpen } = this.state;
    return (
      <div className="container">
        {/* Add Student Modal */}
        <Button variant="contained" onClick={this.toggleAddStudentModal}>Add Student</Button>
        <Modal
          id="addStudent_modal"
          isOpen={isAddStudentOpen}
          closeTimeoutMS={150}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.toggleAddStudentModal}
          className='modal'
          style={modalStyles}
        >
          <IconButton style={closeButtonStyles} onClick={this.toggleAddStudentModal} aria-label="close-button">
            <CloseButton />
          </IconButton>
          <h2>Add Student</h2>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%', display: 'flex', flexDirection: 'column' },
            }}
            noValidate
            autoComplete="on"
          >
            {this.getInputComponent(this.state.firstName, 'firstName')}
            {this.getInputComponent(this.state.lastName, 'lastName')}
            {this.getInputComponent(this.state.gradeType, 'gradeType')}
            {this.getInputComponent(this.state.age, 'age')}
            {this.getInputComponent(this.state.gpa, 'gpa')}
            <Button variant="contained" onClick={() => {this.addStudent(); this.toggleAddStudentModal();}} style={{width: '100%', marginTop: 50}}>Submit</Button>
          </Box>
        </Modal>
        {/* End Add Student Modal */}
        {/* List Students Modal */}
        <Button variant="contained" onClick={() => {this.toggleListStudentsModal()}}>List All Students</Button>
        <Modal
          id="listStudents_modal"
          isOpen={isListStudentsOpen}
          closeTimeoutMS={150}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.toggleListStudentsModal}
          className='modal'
          style={modalStyles}
        >
          <IconButton style={closeButtonStyles} onClick={this.toggleListStudentsModal} aria-label="close-button">
            <CloseButton />
          </IconButton>
          <h2>All Students</h2>
          <ul>
            {
              this.state.allStudents.map((student) => {
                return <li>{student.firstName}</li>
              })
            }
          </ul>
        </Modal>
        {/* End List Students Modal */}
      </div>
    )
  }
};

export default Student;