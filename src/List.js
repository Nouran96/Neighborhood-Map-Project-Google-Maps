import React, { Component } from 'react'

class List extends Component {

    state = {
        value: 'all' // Responsible for changing and storing the value in select menu
    }

    componentDidMount() {
        // Listen to changes of viewport to show or hide list by default
        this.hideOrShowList()
        
        window.addEventListener('resize', () => {
            this.hideOrShowList()
        })
    }

    hideOrShowList() {
        const list = document.getElementById('list'),
                listIcon = document.querySelector('.list-icon')

            if(document.body.clientWidth <= 800) {
                // Hide list by deafult on medium and small screens
                list.classList.add('close-list')
                listIcon.classList.add('close-list-icon')
            }
            else {
                // Show list by default on large screens
                list.classList.remove('close-list')
                listIcon.classList.remove('close-list-icon')
            }
    }

    // Keep the select menu value updated with the selected option through state
    changeValue(e) {
        this.setState({ value: e.target.value })
    }

    filterLocations(e) {
        e.preventDefault()

        const listItems = document.getElementsByClassName('list-item')

        // Found this method here: https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
        const listItemsArr = [].slice.call(listItems);

        // If all places is selected, show all locations and return
        if(this.state.value === 'all') {
            listItemsArr.forEach(item => {
                item.style.display = 'block'
            })
            this.props.filterMap('all')
            return true;
        }

        // Find the selected location from the list
        const searchedLocation = listItemsArr.filter(item => item.textContent === this.state.value)

        // Show only the selected location and hide the others
        listItemsArr.forEach(item => {
            if(item !== searchedLocation[0]) {
                item.style.display = 'none'
            }
            else {
                item.style.display = 'block'
            }
        });

        this.props.filterMap(searchedLocation[0].textContent)
    }

    render() {

        return (
            <nav id="list">
                <div className="list-container">
                    <h1>Egypt's Locations</h1>
                    <form>
                        <select value={this.state.value} onChange={(e) => this.changeValue(e)} aria-label="Locations">

                            <option value="all">All Places</option>
                            {this.props.listLocations.map(location => (
                                <option key={location.urlSearchTerm} value={location.name}>{location.name}</option>
                            ))}

                        </select>
                        <button id="filter" onClick={(e) => {
                            this.filterLocations(e)
                        }}>Filter</button>
                    </form>
                    <ul className="locations-list" role="menu">
                        {this.props.listLocations.map(location => (
                            <li key={location.name} className="list-item" tabIndex='0' onClick={() =>{
                                this.props.togglePopup(location.name)
                            }} onKeyDown={(e) => {
                                if(e.keyCode === 13) //Enter key
                                    this.props.togglePopup(location.name)
                            }} role="menuitem">
                                {location.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <span className="list-icon" onClick={this.props.closeMenu} onKeyDown={(e) => {
                    if(e.keyCode === 13)
                        this.props.closeMenu()
                }} tabIndex='0' aria-label="menu" title="Menu">
                    <i className="fas fa-align-justify"></i>
                </span>
            </nav>
        )
    }
}

export default List;