import './card-component.style.css';
import { Monster } from '../../App';

type cardProps = {
  monster: Monster;
};

const Card = ({ monster }: cardProps) => {
  const { id, name, email } = monster;
  return (
    <div className="card-container">
      <img
        alt={`monster ${name}`}
        src={`https://robohash.org/${id}?set=set2&size180x180`}
      />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default Card;
