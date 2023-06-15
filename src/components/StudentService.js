import React from 'react';

const URL = 'http://localhost:5000/students/';

export const postStudent = async (data) => {
  data['courses'] = [];
  fetch(URL + 'add', {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
};

export const getStudents = async () => {
  let response = await fetch(URL + 'all', {
    method: 'GET',
    mode: 'cors'
  });
  let data = await response.json();
  return data;
}