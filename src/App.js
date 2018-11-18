import React, { Component } from 'react';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faSearch } from '@fortawesome/free-solid-svg-icons'

//
//
import Data from './Components/Data'
import Ads from './Components/Ads'
import BottomScrollListener from './lib/index';
import Navbar from './Components/Navbar';



library.add(faSearch, fas)

const urlBase= 'http://localhost:3000/api/products';

class App extends Component {
  state = {
    data: [],
    page: 0,
    bottom: false,
    hasMore: false,
    status: false,
    ads: [],
    endData: false,
    totalData: 0,
    limit: 20,
    totalAds: [
      {
        id: '',
        data: {
          ads: 'COCA',
          size: '',
          price: '',
          face: '',
          date: '',
          bgColor: '#c1224f',
          color: '#f16f6f',
        }
      },
      {
        id: '',
        data: {
          ads: 'PEPSI',
          size: '',
          price: '',
          face: '',
          date: '',
          bgColor: '#f16f6f',
          color: '#c1224f',
        }
      },
      {
        id: '',
        data: {
          ads: 'FANTA',
          size: '',
          price: '',
          face: '',
          date: '',
          bgColor: '#94d2e6',
          color: '#fff78f',
        }
      },
      {
        id: '',
        data: {
          ads: 'SPRITE',
          size: '',
          price: '',
          face: '',
          date: '',
          bgColor: '#fff78f',
          color: '#94d2e6',
        },

      },
      {
        id: '',
        data: {
          ads: 'REDBULL',
          size: '',
          price: '',
          face: '',
          date: '',
          bgColor: '#5c7893',
          color: '#843b62',
        },

      },
      {
        id: '',
        data: {
          ads: 'HYPE',
          size: '',
          price: '',
          face: '',
          date: '',
          bgColor: '#843b62',
          color: '#5c7893',
        },

      },

    ],
    sort: 'price',
    newDataEnd: 10,
    random: 1
  }


  componentDidMount() {
    axios({
      method: 'get',
      url:  urlBase + '?_sort=' + this.state.sort + '&_page=' + this.state.page + '&_limit=' + this.state.limit,
    })
      .then(res => {
        this.setState({
          data: res.data
        });
        this.setState({ status: true, totalData: res.headers['x-total-count'] })
        console.log(this.state)
      })
  }


  _getData = () => {
    axios({
      method: 'get',
      url:  urlBase + '?_sort=' + this.state.sort + '&_page=' + this.state.page + '&_limit=' + this.state.limit,
    })
      .then(res => {
        this.setState(previousState => ({
          data: previousState.data.concat(res.data)
        }));
        this.setState({ status: true })
      })
  }



  bottom = () => {
    this.setState({ status: false, limit: 10 })
    this.setState((prevPage) => { return { page: prevPage.page + 1 } })
    this.setState((prevNewDataEnd) => { return { newDataEnd: prevNewDataEnd.newDataEnd + 10 } })
    this._getData()
    if (this.state.data.length > this.state.totalData - 1) {
      this.setState({ endData: true })
    }
  }

  _sortHandler = async (event) => {
    await this.setState({ sort: event.target.value, page: 0, limit: 20, newDataEnd: 10 });
    axios({
      method: 'get',
      url: urlBase + '?_sort=' + this.state.sort + '&_page=' + this.state.page + '&_limit=' + this.state.limit,
    })
      .then(res => {
        this.setState({
          data: res.data
        });
        this.setState({ status: true, totalData: res.headers['x-total-count'] })
        console.log(this.state)
      })
  }

  _toStamp = (time) => {
    let y = new Date(time).toLocaleString()
    let dateTimeParts = y.split(' '),
      timeParts = dateTimeParts[1].split(':'),
      datePartss = dateTimeParts[0].split(','),
      dateParts = datePartss[0].split('/'),
      date;
    date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
    let dataTime = date.getTime()
    let today = Date.now()
    let showTime = Math.round((today - dataTime) / 864000000);
    return showTime
  }


  _lazyData = () => {
    const lazyData = []
    for (let key in this.state.data) {
      lazyData.push({
        id: key,
        data: this.state.data[key]
      })
      if (lazyData.length !== 0 && parseFloat(lazyData.length % 21) === 0) {
        const randomData = this.state.totalAds[Math.floor(Math.random() * 6)]
        lazyData[key] = randomData
        console.log(lazyData)
      }
    }
    return lazyData
  }


  _limitData = () => {
    if (this.state.limit === 20) {
      let limitData1 = this._lazyData().splice(0, 10)
      const showData = limitData1.map(data => (
        !data.data.ads
          ? <Data key={data.id || ''}
            face={data.data.face || ''}
            price={data.data.price || ''}
            size={data.data.size || ''}
            date={this._toStamp(data.data.date) || ''} />
          : <Ads key={Math.random() * 10000}
            ads={data.data.ads}
            bgColor={data.data.bgColor}
            color={data.data.color}
          />
      ))
      return showData
    }
    else if (this.state.limit === 10) {
      let limitData2 = this._lazyData().splice(0, this.state.newDataEnd)
      const showData = limitData2.map(data => (
        !data.data.ads
          ? <Data key={data.id || ''}
            face={data.data.face || ''}
            price={data.data.price || ''}
            size={data.data.size || ''}
            date={this._toStamp(data.data.date) || ''} />
          : <Ads key={Math.random() * 10000}
            ads={data.data.ads}
            bgColor={data.data.bgColor}
            color={data.data.color}
          />
      ))
      return showData
    }
  }

  render() {

    return (
      <div className="App">
        <Navbar />
        <div className="scrolling container "  >
          <div className="buttons" >
            <div className="sort-box">
              <div className="sort-buttons" >
                <p className="sort-text" > sort by : </p>
                <select className="select-sorting" value={this.state.sort} onChange={this._sortHandler} >
                  <option value="price" name="price" defaultValue >price</option>
                  <option value="size" name="size" >size</option>
                  <option value="date" name="date" >date</option>
                </select>
              </div>
              <div className="search-box" >
                <input className="search" placeholder="search . . ." />
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
              </div>
            </div>
          </div>
          <div className="scroll-parent" ref={(ref) => this.scrollParentRef = ref}>
            <div id="header" className="header container" ref={div => this.div = div} >
              {this._limitData()}
              {this.state.status || this.state.endData ? '' : <p className="loader" > </p>}
              {this.state.endData ? <p className="end-data" >~ end of catalogue ~</p> : ''}
            </div>
          </div>
          <BottomScrollListener onBottom={this.bottom} />
        </div>
      </div>
    );
  }
}

export default App;
