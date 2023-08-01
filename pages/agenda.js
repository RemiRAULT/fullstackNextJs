import { Layout } from "components/Layout";
import ReactBigCalendar from '../components/Agenda';

const Calendar = () => {
  return (
    <Layout>
      <div>
        <ReactBigCalendar />
      </div>
    </Layout>
  );
};

export default Calendar;