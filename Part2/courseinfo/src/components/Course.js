
const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    const sum = parts.reduce((s, p) => s + p.exercises, 0);
    console.log(sum);
    return  <b>Total of {sum} exercises</b>
}

const Part = ({ part }) => {
    console.log("part", part);
    return <p>{part.name} {part.exercises}</p>

}

const Content = ({ parts }) =>
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
        )}
    </>



const Course = ({ course }) => {
    console.log(course.name);
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course