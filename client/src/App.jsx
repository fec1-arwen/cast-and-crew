import React from 'react';
import PersonnelCarousel from './components/PersonnelCarousel.jsx';
import MoviesCarousel from './components/MoviesCarousel.jsx';
import {Main} from './styling.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personnel: [],
      featuredMovie: {},
      featuredPersonnel: null,
      selectedPersonnel: null
    };
  }

  componentDidMount() {
    let qs = new URLSearchParams(window.location.search);
    let res = qs.get('id');
    let search = res ? res : 1;
    this.getFeaturedMovie(search);
  }

  getFeaturedMovie(qs) {
    return fetch(`/api/movies?id=${qs}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(results => results.json())
      .then(results => this.setState({ featuredMovie: results }))
      .then(() => this.setState({personnel: this.state.featuredMovie.personnel}));
  }

  getPersonnelInfo(id) {
    fetch(`/api/personnel?id=${id._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(results => results.json())
    .then(results => this.setState({featuredPersonnel: results, selectedPersonnel: id.name}))
  }

  render() {
    if (!this.state.personnel.length) {
      return <div>Loading...</div>
    } else {
      return (
        <Main>
          <PersonnelCarousel personnel={this.state.personnel} movie={this.state.featuredMovie} set={this.getPersonnelInfo.bind(this)} />
          <MoviesCarousel featuredPersonnel={this.state.featuredPersonnel} selectedPersonnel={this.state.selectedPersonnel} />
        </Main>
      )
    }
  }

}

export default App;
