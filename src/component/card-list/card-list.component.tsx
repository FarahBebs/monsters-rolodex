import Card from '../card/card-component';
import './card-list.style.css';
import { Monster } from '../../App';
type cardListProps = {
  monsters: Monster[];
};
const CardList = ({ monsters }: cardListProps) => {
  return (
    <div className="card-list">
      {monsters.map((monster) => {
        return <Card monster={monster} key={monster.id} />;
      })}
    </div>
  );
};

export default CardList;
