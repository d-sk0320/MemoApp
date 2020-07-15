import React, { memo } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

import firebase from 'firebase'

import CircleButton from '../elements/CircleButton'

class MemoEditScreen extends React.Component {
  state = {
    body: '',
    key: ''
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params)
    const {params} = this.props.navigation.state
    this.setState({ 
      body: params.memo.body,
      key: params.memo.key 
    })
  }

  handlePress() {
    const { currentUser } = firebase.auth()
    const db = firebase.firestore()
    console.log(this.state)
    db.collection(`users/${currentUser.uid}/memos/`).doc(this.state.key)
      .update({
        body: this.state.body
      })
      .then(() => {
        console.log('success!!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.memoEditInput} 
          multiline
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body: text }) }}
        />

        <CircleButton
          name="check"
          onPress={ this.handlePress.bind(this) } 
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16
  }
})

export default MemoEditScreen