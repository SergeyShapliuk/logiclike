import it from 'node:test';

import React, { useEffect, useState } from 'react';

import classes from './App.module.scss';
import useFetchList from './common/hooks/useFetch';
import { LogicListResponseType } from './types/types';

const App = () => {
  const { data, isLoading, hasError, errorMessage } = useFetchList(
    'https://logiclike.com/docs/courses.json',
  );

  const [tags, setTags] = useState<string[]>(null);
  const [dataCourse, setDataCourse] = useState<LogicListResponseType[]>(null);
  const [isActive, setIsActive] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setDataCourse(data);
      const tags = data
        .map(course => course.tags)
        .reduce((a, b) => a.concat(b), [])
        .filter((tag, index, array) => array.indexOf(tag) === index);

      console.log('useEf');
      tags.unshift('Все темы');
      setTags(tags);
    }
  }, [data]);
  // const sidebarList = useMemo(() => {
  //   if (!dataCourse) {
  //     return null;
  //   }
  //   const tags = dataCourse
  //     .map(course => course.tags)
  //     .reduce((a, b) => a.concat(b), [])
  //     .filter((tag, index, array) => array.indexOf(tag) === index);
  //
  //   tags.unshift('Все темы');
  //
  //   return tags;
  // }, [dataCourse]);

  const onPressHandle = (item: string, itemIndex: number) => {
    if (itemIndex === 0) {
      setDataCourse(data);
    } else {
      const filtered = data.filter(card => card.tags.indexOf(item) !== -1);

      setDataCourse(filtered);
    }
    setIsActive(itemIndex);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      let newIndex = isActive + 1;

      if (newIndex >= tags.length) {
        newIndex = 0;
      }
      setIsActive(newIndex);
    }
  };

  if (!dataCourse) {
    return <div className={classes.isError}>Загрузка...</div>;
  }
  console.log('dataCourse');

  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          {tags.map((item, index) => (
            <div
              key={index}
              onKeyDown={handleKeyPress}
              onClick={() => onPressHandle(item, index)}
              role="button"
              tabIndex={0} // Установка tabIndex
              className={`${classes.itemSidebar} ${isActive === index && classes.isActive}`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className={classes.cardContainer}>
          {dataCourse &&
            dataCourse.map(item => (
              <div key={item.id} className={classes.card}>
                <div className={classes.imageContainer} style={{ backgroundColor: item.bgColor }}>
                  <img src={item.image} className={classes.image} alt="" />
                </div>
                <div className={classes.textContainer}>{item.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
