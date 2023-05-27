{
  cars.map(car=>(
    <Route path={`/collection/${car.title}`} Component={carDetail} key={car.id}  ></Route>
  ))

}