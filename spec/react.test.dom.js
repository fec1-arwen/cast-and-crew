import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/App.jsx';
import mockData from './mockData.js';

let wrapper = mount(<App/>);
/* If the App mounts successfully, remount before each test */
beforeEach(() => {
  wrapper.mount();
});

describe('App.jsx component', () => {
  test('App should display "Loading..." text before retrieving data', () => {
    wrapper.unmount(); //the test should run before the mock data is fetched
    wrapper.mount();
    expect(wrapper.text()).toContain('Loading...');
  });

  test('App state should be set to retrieved movie data', () => {
    expect(wrapper.state().featuredMovie.title).toBe('The Matrix');
  });

  test('PersonnelCarousel should render once data is retrieved', () => {
    expect(wrapper.find('div.carousel_container').html()).toContain('id="personnel_carousel');
  });

  test('PersonnelCarousel should contain Person components', () => {
    expect(wrapper.find('Person')).toHaveLength(2);
  });

  test('MovieCarousel should not have any children before a click event', () => {
    expect(wrapper.find('MovieCarousel').html()).toBe(null);
  });

  test('Clicking a Person component should call fetch()', () => {
    wrapper.find('div.headshot').first().simulate('click');
    expect(fetch.mock.calls.length).toBe(3);
  });
});

describe('MovieCarousel.jsx component', () => {
  beforeEach(() => {
    wrapper.find('div.headshot').first().simulate('click');
  });

  test('Clicking a Person component should render movies in the MovieCarousel', () => {
    expect(wrapper.state().featuredPersonnel[0].title).toBe('The Matrix');
    expect(wrapper.find('MovieCarousel').html()).toContain('The Matrix');
  });

  test('A Movie component infoplate should contain its metadata', () => {
    expect(wrapper.find('div.rt_rating').text()).toBe('42%');
    expect(wrapper.find('#mpaa_rating').text()).toBe('R');
  });

  test('A Movie component infoplate should reflect the same data in its state', () => {
    expect(wrapper.find('div.rt_rating').text()).toBe('42%');
    expect(wrapper.find('#mpaa_rating').text()).toBe('R');
  });
});

