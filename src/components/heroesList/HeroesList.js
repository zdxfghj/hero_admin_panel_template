import { useCallback,useMemo} from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
import { useGetHeroesQuery,useDeleteHeroMutation } from '../../api/apiSlice';

const HeroesList = () => {

   const {
    data: heroes = [],//если данные еще не полученны присваиваем пустой массив
    isFetching, //говори то последуущих запросах на сервер
    isLoading,  //говорит нам что мы в первый раз обращаемся к серверу
    isError, 
    isSuccess //когда данные загрузились
   } = useGetHeroesQuery();

   const [deleteHero] = useDeleteHeroMutation();

   const activeFilter = useSelector(state => state.filters.activeFilter);

   const filteredHeroes = useMemo(() =>{ // используем useMemo что бы наш компонент не перерисовывался постоянно, а только после изменения heroes
     
    const filteredHeroes = heroes.slice(); //если есть мутации то лучше работать с копией массива
        if (activeFilter == 'all'){
            return filteredHeroes;
        }else{
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
   },[heroes,activeFilter]);


   

    const onDelete = useCallback((id) => {
        deleteHero(id)
        // request(`http://localhost:3001/heroes/${id}`, "DELETE")
        //     .then(data => console.log(data, 'Deleted'))
        //     .then(dispatch(heroDeleted(id)))
        //     .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition timeout={0} classNames="hero">
					<h5 className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>
			);
		}

		return arr.map(({ id, ...props }) => {
			return (
				<CSSTransition key={id} timeout={500} classNames="hero">
					<HeroesListItem {...props} onDelete={() => onDelete(id)} />
				</CSSTransition>
			);
		});
	};
    

    const elements = renderHeroesList(filteredHeroes);
    
    return (
        <TransitionGroup component="ul">
            {elements} 
        </TransitionGroup>
    )
}

export default HeroesList;