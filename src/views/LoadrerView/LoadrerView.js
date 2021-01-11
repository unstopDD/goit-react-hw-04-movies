import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './LoaderView.module.css';

export default function LoaderView() {
  return (
    <div className={s.Loader}>
      <Loader type="Rings" color="#2211FF" height={180} width={180} />
    </div>
  );
}
