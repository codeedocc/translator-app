 <p><strong>Проект:</strong> https://codeedocc.github.io/translator-app/</p>

 <br />

 <h1 align="center">Используемые технологии:</h1>
 
 <br />

 <h1>1. <strong>React-router-dom</strong></h1>
 <p>В этом проекте несколько страниц. Для взаимодействия с ними я использую react-router-dom:</p>
 <img src='https://user-images.githubusercontent.com/83381510/230737764-1499b61b-1425-4a3b-9cd7-09f48fc38071.png'/>
 <p>Для перемещения между страницами реализована навигационная панель. В зависимости от текущей страницы иконка будет подсвечиваться синим цветом:</p>
 <img src='https://user-images.githubusercontent.com/83381510/230738056-ab6a8cb8-65e1-4b76-84b4-9d2f016e2f64.png'/>
 <p>Эти иконки я храню в отдельном файле внутри массива. Каждый элемент массива - это объект с необходимым набором данных:</p>
 <img src='https://user-images.githubusercontent.com/83381510/230738275-130e4543-0db2-41de-9b07-b794afcf253b.png'/>
 <p>Ссылка на файл с массивом иконок:</p>
 <p>https://github.com/codeedocc/translator-app/blob/main/src/assets/constants/index.tsx</p>

 <br />

 <h1>2. <strong>RTK Query</strong></h1>
 <p>В этом проекте идёт обращение к двум разным API:</p>
 <p>- Первое предоставляет список стран (а также детальную информацию о каждой конкретной стране).</p>
 <p>- Второе даёт нам список языков, доступных для перевода.</p>
 <p>Всю логику по взаимодействию с этими данными и стейты, которые к ним относятся, я распределил по соответствующим папкам:</p>
 <img src='https://user-images.githubusercontent.com/83381510/230739697-494d5fd6-4ea2-4a08-a0ef-1c3d5e58aab3.png'/>
 <p>Здесь создаётся эндпоинт, позволяющий получить список стран с конкретной информацией:</p>
 <p>https://github.com/codeedocc/translator-app/blob/main/src/store/country/country.api.ts</p>
 <p>Здесь создаются эндпоинты для запросов на получение доступных языков и их перевод:</p>
 <p>https://github.com/codeedocc/translator-app/blob/main/src/store/language/language.api.ts</p>
 
 <br />

 <h1>3. <strong>React-select</strong></h1>
 <p>Теперь, когда у нас есть все необходимые данные, я помещаю страны с языком, доступным для перевода, в react-select:</p>
 <img src='https://user-images.githubusercontent.com/83381510/230740023-3e8ee50c-66c9-4a42-9c42-be96a157b3ab.png'/>
 <p>Для удобства поиска в выпадающих списках есть возможность ручного ввода:</p>
 <img src='https://user-images.githubusercontent.com/83381510/230740092-b9230972-74d1-45bc-b6ee-cf560ee98190.png'/>
 <p>Вся логика по сортировке стран описана в функции getCountries на строке 71:</p>
 <p>https://github.com/codeedocc/translator-app/blob/main/src/pages/Home.tsx</p>

 <br />

 <h1>4. <strong>Loader для ожидания</strong></h1>
 <p>Для того, чтобы визуализировать процесс загрузки, я создал компонент Loader, который выглядит следующим образом:</p>
 <img src='https://user-images.githubusercontent.com/83381510/230740518-14291c9a-858b-4b2e-80aa-9d220f222a09.png'/>
 <p>Ссылка на Loader:</p>
 <p>https://github.com/codeedocc/translator-app/blob/main/src/components/Loader.tsx</p>
 
 <br />

 <h1>5. <strong>React-hot-toast</strong></h1>
 <p>Полученный текст можно либо скопировать, либо добавить в избранное. И в том, и в другом варианте после выполнения действия мы увидим соответсвующее уведомление:  </p>
 <img src='https://user-images.githubusercontent.com/83381510/230740897-93bb1c73-93a9-477d-9cf3-de1e991bfd2a.png'/>
 <p>Логика для уведомления о копировании описана в функции handleCopy на строке 39:</p>
 <p>https://github.com/codeedocc/translator-app/blob/main/src/components/TextInput.tsx</p>
 
  <br />

  <h1>6. <strong>LocalStorage</strong></h1>
  <p>Весь текст, попадающий и в историю, и в избранное, хранится по уникальным ключам в LocalStorage. Текст сортируется и выводится по порядку:</p>
  <img src='https://user-images.githubusercontent.com/83381510/230741421-47e87449-1d86-4964-b670-fd479e23b75f.png'/>
  <p>На строке 184 внутри useEffect можно увидеть логику, которая позволяет добавлять переведённый текст в историю:</p>
  <p>https://github.com/codeedocc/translator-app/blob/main/src/pages/Home.tsx</p>
  
  <br />

  <h1>7. <strong>Модальные окна</strong></h1>
  <p>В проекте большая часть логики завязана на взаимодействии с модальными окнами. Для этого я создал отдельный переиспользуемый компонент:</p>
  <p>https://github.com/codeedocc/translator-app/blob/main/src/components/Modal.tsx</p>
  <p>Например, если мы захотим очистить всю историю, мы увидим такое окошко:</p>
  <img src='https://user-images.githubusercontent.com/83381510/230741638-94326ea0-d0f8-4728-8059-1daa02a21eab.png'/>
  <p>Если мы захотим добавить текст из истории в избранное, мы также увидим модальное окно:</p>
  <img src='https://user-images.githubusercontent.com/83381510/230741717-fc2de0b6-057b-4163-97ad-5157bdeba3dd.png'/>

  <br />

  <h1>8. <strong>Валидация</strong></h1>
  <p>Если мы попытаемся добавить в избранное текст с пустым названием или с уже существующим названием, то мы увидим соответствующее сообщение.</p>
  <p>Например, вот попытка добавить в избранное текст без названия:</p>
  <img src='https://user-images.githubusercontent.com/83381510/230742706-258ec880-f62a-4e9d-9e64-81ce1e8c3fe1.png'/>

  <br />

  <h1>9. <strong>SCSS и адаптивная вёрстка</strong></h1>
  <p>Все стили написаны с помощью SCSS, проект выглядит хорошо на любом устройстве, с которого вы будете его открывать.</p>
  <p>К примеру, так выглядит главная страница с телефона:</p>
  <img src='https://user-images.githubusercontent.com/83381510/230741974-f170f223-5855-4b73-a8aa-c724aecde68a.png'/>
  
  <br />

  <h1>10. <strong>TypeScript</strong></h1>
  <p>Проект максимально типизирован для удобства разработки и дальнейшего масштабирования.</p>












