import { useState } from "react"
import Head from "next/head"
import stays from "../data/stays.json"
import Card from "../components/Card/Card"

export default function Home() {
  const [openNav, setOpenNav] = useState(false)
  const [search, setSearch] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  const [openGuest, setOpenGuest] = useState(false)
  const [guestChild, setGuestChild] = useState(0)
  const [guestAdult, setGuestAdult] = useState(0)

  const guestTotal = guestChild + guestAdult

  const checkBeds = (stay) => {
    if ((stay.beds > 0 && stay.beds >= guestTotal) || stay.beds === null) {
      return true
    }
    return false
  }

  const filteredStays = stays.filter(
    (stay) =>
      stay.city.toLowerCase().includes(city.toLowerCase()) &&
      stay.country.toLowerCase().includes(country.toLowerCase()) &&
      checkBeds(stay)
  )

  const uniqueLocations = Array.from(
    new Set(stays.map((a) => `${a.city}, ${a.country}`))
  )

  return (
    <div className="text-18px">
      {openNav && (
        <div className="fixed w-screen h-5/6 bg-white z-10 shadow-md rounded-2xl">
          <div className="flex flex-col w-11/12 mx-auto gap-4 font-mulis">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xs">Edit your search</p>
              <button onClick={() => setOpenNav(!openNav)}>
                <span className="align-middle material-icons">close</span>
              </button>
            </div>
            <div className="xl:flex xl:justify-center">
              <div className="flex flex-col justify-center rounded-xl shadow-md text-sm border border-gray-light divide-y divide-gray-light xl:divide-y-0 xl:flex-row xl:justify-around xl:w-2/4">
                <div className="pl-4 py-2">
                  <p className="text-gray-darkest text-xs font-extrabold pt-1">
                    Location
                  </p>
                  <div className="flex justify-between">
                    <input
                      className="focus:outline-none text-gray-darkest w-full text-sm pb-1"
                      value={search}
                      placeholder="Where do you want to stay?"
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                    />
                    {search !== "" && (
                      <button
                        className="focus:outline-none pr-2 transform"
                        onClick={() => {
                          setSearch("")
                          setOpenGuest(false)
                          setCity("")
                          setCountry("")
                          setGuestAdult(0)
                          setGuestChild(0)
                        }}
                      >
                        <span className="align-middle material-icons transform">
                          close
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <p className="pl-4 text-gray-darkest text-xs font-extrabold pt-1">
                    Guests
                  </p>
                  <p
                    className={`${
                      guestTotal === 0
                        ? "text-gray-lightest"
                        : "text-gray-darkest"
                    } pl-4 text-sm pb-1`}
                  >
                    {guestTotal !== 0
                      ? guestTotal > 1
                        ? `${guestTotal} guests`
                        : `${guestTotal} guest`
                      : "Add guests"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-11/12 mx-auto gap-4 xl:items-center">
              {!openGuest ? (
                uniqueLocations
                  .filter((stay) =>
                    stay.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((stay) => (
                    <button
                      key={stay}
                      value={stay}
                      onClick={(e) => {
                        const words = e.target.value.split(", ")
                        setCity(words[0])
                        setCountry(words[1])
                        setSearch(e.target.value)
                        setOpenGuest(true)
                      }}
                      className="text-sm flex items-center gap-1 text-gray-darker focus:outline-none"
                    >
                      <span className="material-icons">place</span>
                      {stay}
                    </button>
                  ))
              ) : (
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="text-sm text-gray-darkest">Adults</p>
                    <p className="text-sm text-gray-lightest">
                      Ages 13 or above
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <button
                        className="border border-gray-normal w-6 h-6 focus:outline-none"
                        onClick={() =>
                          setGuestAdult(
                            guestAdult > 0 ? guestAdult - 1 : guestAdult
                          )
                        }
                      >
                        -
                      </button>
                      <p>{guestAdult}</p>
                      <button
                        className="border border-gray-normal w-6 h-6 focus:outline-none"
                        onClick={() => setGuestAdult(guestAdult + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-darkest">Children</p>
                    <p className="text-sm text-gray-lightest">Ages 2-12</p>
                    <div className="flex items-center gap-4 pt-2">
                      <button
                        className="border border-gray-normal w-6 h-6 focus:outline-none"
                        onClick={() =>
                          setGuestChild(
                            guestChild > 0 ? guestChild - 1 : guestChild
                          )
                        }
                      >
                        -
                      </button>
                      <p>{guestChild}</p>
                      <button
                        className="border border-gray-normal w-6 h-6 focus:outline-none"
                        onClick={() => setGuestChild(guestChild + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-white bg-red-light flex items-center justify-center gap-2 w-2/4 h-12 self-center rounded-2xl xl:w-11/12 mr-4"
                    onClick={() => setOpenNav(!openNav)}
                  >
                    <span className="align-middle material-icons">search</span>
                    Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-11/12 mx-auto flex flex-col gap-8 xl:w-10/12">
        <Head>
          <title>Windbnb</title>
          <link rel="icon" href="/triangleLogo.png" />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Mulish:wght@400;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>

        <nav className="flex flex-col gap-8 xl:flex-row xl:justify-between">
          <img
            className="mt-4 self-start xl:mt-10"
            src="/logo.png"
            alt="logo"
          />
          <div className="font-mulish flex items-center justify-evenly mx-8 rounded-xl shadow-md h-12 text-sm border border-gray-lightest xl:mx-0 xl:mt-8 xl:w-80">
            <p className="text-gray-darkest">{search ? search : "Search"}</p>
            <p className="text-gray-lightest">
              {guestTotal !== 0
                ? guestTotal > 1
                  ? `${guestTotal} guests`
                  : `${guestTotal} guest`
                : "Add guests"}
            </p>
            <button onClick={() => setOpenNav(!openNav)}>
              <span className="text-red-light align-middle material-icons">
                search
              </span>
            </button>
          </div>
        </nav>

        <main className="flex flex-col gap-8">
          <div className="flex justify-between font-mont">
            <h1 className="font-bold text-lg xl:text-2xl">
              {country ? `Stays in ${country}` : "All stays"}
            </h1>
            <p className="font-medium text-sm">
              {`${Object.keys(filteredStays).length} ${
                Object.keys(filteredStays).length > 1 ? "stays" : "stay"
              }`}
            </p>
          </div>
          <div className="flex flex-col gap-8 items-center xl:flex-row xl:flex-wrap ">
            {city === "" || country === ""
              ? stays.map((stay) => <Card key={stay.photo} stay={stay} />)
              : filteredStays.map((stay) => (
                  <Card key={stay.photo} stay={stay} />
                ))}
          </div>
        </main>

        <footer className="self-center">
          <p className="pb-4 font-mont text-gray-light text-sm font-semibold">
            <a href="https://github.com/durashere">durashere</a> @{" "}
            <a href="https://devchallenges.io">DevChallenges.io</a>
          </p>
        </footer>
      </div>
    </div>
  )
}
