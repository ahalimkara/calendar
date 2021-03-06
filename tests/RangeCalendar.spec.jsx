/* eslint-disable no-undef, max-len */
import React from 'react';
import moment from 'moment';
import { mount, render } from 'enzyme';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import RangeCalendar from '../src/RangeCalendar';

const format = ('YYYY-MM-DD');

describe('RangeCalendar', () => {
  it('render works', () => {
    const wrapper = mount(<RangeCalendar />);
    expect(wrapper.find('.rc-calendar-cell').length).toBeGreaterThan(0);
  });

  it('render hoverValue correctly', () => {
    const wrapper = render(<RangeCalendar hoverValue={[moment(), moment().add(1, 'months')]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('next month works', () => {
    const wrapper = mount(<RangeCalendar />);

    const currentEndMonth = wrapper.state('value')[1].clone();
    wrapper.find('.rc-calendar-range-right .rc-calendar-next-month-btn').simulate('click');
    expect(currentEndMonth.add(1, 'month').isSame(wrapper.state('value')[1], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-prev-month-btn').length).toBe(1);

    const currentStartMonth = wrapper.state('value')[0].clone();
    wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').simulate('click');
    expect(currentStartMonth.add(1, 'month').isSame(wrapper.state('value')[0], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(0);
  });

  it('previous month works', () => {
    const wrapper = mount(<RangeCalendar />);

    const currentStartMonth = wrapper.state('value')[0].clone();
    wrapper.find('.rc-calendar-range-left .rc-calendar-prev-month-btn').simulate('click');
    expect(currentStartMonth.subtract(1, 'month').isSame(wrapper.state('value')[0], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);

    const currentEndMonth = wrapper.state('value')[1].clone();
    wrapper.find('.rc-calendar-range-right .rc-calendar-prev-month-btn').simulate('click');
    expect(currentEndMonth.subtract(1, 'month').isSame(wrapper.state('value')[1], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-prev-month-btn').length).toBe(0);
  });

  it('next year works', () => {
    const wrapper = mount(<RangeCalendar />);

    const currentEndMonth = wrapper.state('value')[1].clone();
    wrapper.find('.rc-calendar-range-right .rc-calendar-next-year-btn').simulate('click');
    expect(currentEndMonth.add(1, 'year').isSame(wrapper.state('value')[1], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-prev-year-btn').length).toBe(1);

    const currentStartMonth = wrapper.state('value')[0].clone();
    wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').simulate('click');
    expect(currentStartMonth.add(1, 'year').isSame(wrapper.state('value')[0], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(0);
  });

  it('previous year works', () => {
    const wrapper = mount(<RangeCalendar />);

    const currentStartMonth = wrapper.state('value')[0].clone();
    wrapper.find('.rc-calendar-range-left .rc-calendar-prev-year-btn').simulate('click');
    expect(currentStartMonth.subtract(1, 'year').isSame(wrapper.state('value')[0], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);

    const currentEndMonth = wrapper.state('value')[1].clone();
    wrapper.find('.rc-calendar-range-right .rc-calendar-prev-year-btn').simulate('click');
    expect(currentEndMonth.subtract(1, 'year').isSame(wrapper.state('value')[1], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-prev-year-btn').length).toBe(0);
  });

  it('left panel show next btns when right panel show year panel or month panel', () => {
    let wrapper = null;
    wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);

    wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
  });

  it('right panel show prev btns when left panel show year panel or month panel', () => {
    let wrapper = null;
    wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-month-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-year-btn').length).toBe(1);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-month-btn').length).toBe(1);

    wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-year-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-year-btn').length).toBe(1);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-month-btn').length).toBe(1);
  });

  it('left panel cannot select month same or after right panel', () => {
    const wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-month-select').simulate('click');
    const monthCells = wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-cell');
    const rightPanelMonth = wrapper.state('value')[1].month();
    expect(monthCells.get(rightPanelMonth).props.className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
    expect(monthCells.get(rightPanelMonth + 1).props.className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
  });

  it('right panel cannot select month same or before left panel', () => {
    const wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
    const monthCells = wrapper.find('.rc-calendar-range-right .rc-calendar-month-panel-cell');
    const leftPanelMonth = wrapper.state('value')[0].month();
    expect(monthCells.get(leftPanelMonth).props.className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
    expect(monthCells.get(leftPanelMonth - 1).props.className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
  });

  it('left panel and right panel should not be the same month even we try to set it', () => {
    const wrapper = mount(<RangeCalendar value={[moment(), moment()]} />);
    const value = wrapper.state('value');
    expect(value[0].isSame(moment())).toBe(true);
    expect(value[1].isSame(moment().add(1, 'month'))).toBe(true);
  });

  it('left panel and right panel should not be the same month', () => {
    const wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-today').simulate('click').simulate('click');
    const selectedValue = wrapper.state('selectedValue');
    expect(selectedValue[0].isSame(moment())).toBe(true);
    expect(selectedValue[1].isSame(moment())).toBe(true);
    const value = wrapper.state('value');
    expect(value[0].isSame(moment())).toBe(true);
    expect(value[1].isSame(moment().add(1, 'month'))).toBe(true);
  });

  it('onSelect works', () => {
    function onSelect(d) {
      expect(d[0].format(format)).toBe('2015-09-04');
      expect(d[1].format(format)).toBe('2015-10-02');
    }

    const now = moment([2015, 8, 29]);

    const wrapper = mount(
      <RangeCalendar
        format={format}
        onSelect={onSelect}
        defaultValue={[now, now.clone().add(1, 'months')]}
        showWeekNumber
      />
    );
    wrapper.find('.rc-calendar-range-left .rc-calendar-date').at(5).simulate('click'); // 9.4
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-09-04');
    wrapper.find('.rc-calendar-range-right .rc-calendar-date').at(5).simulate('click'); // 10.2
    expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('2015-10-02');
  });

  it('onSelect works reversely', () => {
    function onSelect(d) {
      expect(d[0].format(format)).toBe('2015-09-04');
      expect(d[1].format(format)).toBe('2015-09-14');
    }

    const now = moment([2015, 8, 29]);

    const wrapper = mount(
      <RangeCalendar
        format={format}
        onSelect={onSelect}
        defaultValue={[now, now.clone().add(1, 'months')]}
        showWeekNumber
      />
    );

    wrapper.find('.rc-calendar-range-left .rc-calendar-date').at(15).simulate('click'); // 9.14
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-09-14');

    wrapper.find('.rc-calendar-range-left .rc-calendar-date').at(5).simulate('click'); // 9.4
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-09-04');
    expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('2015-09-14');
  });

  it('onHoverChange works', () => {
    let hoverValue = null;
    function onHoverChange(hv) {
      hoverValue = hv;
    }
    const wrapper = mount(<RangeCalendar onHoverChange={onHoverChange} />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-cell').at(10).simulate('click');
    wrapper.find('.rc-calendar-range-left .rc-calendar-cell').at(20).simulate('mouseEnter');
    expect(hoverValue[0].format(format)).toBe('2017-03-08');
    expect(hoverValue[1].format(format)).toBe('2017-03-18');
  });

  describe('timePicker', () => {
    it('defaultOpenValue should follow RangeCalendar[selectedValue|defaultSelectedValue] when it is set', () => {
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} defaultSelectedValue={[moment('01:01:01', 'HH:mm:ss'), moment('01:01:01', 'HH:mm:ss')]} />);
      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      const selectedValues = wrapper.find('.rc-time-picker-panel-select-option-selected');
      for (let i = 0; i < selectedValues.length; i += 1) {
        expect(selectedValues.at(i).text()).toBe('01');
      }
    });

    it('use timePicker\'s time', () => {
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} />);

      wrapper.find('.rc-calendar-today').at(0).simulate('click').simulate('click');
      // use timePicker's defaultValue if users haven't select a time
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 00:00:00');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 23:59:59');

      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');

      // update time to timePicker's time
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(0).find('li').at(6).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 06:00:00');

      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(0).find('li').at(6).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 06:59:59');

      wrapper.find('.rc-calendar-range-left .rc-calendar-cell').at(10).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/8/2017 06:00:00');

      wrapper.find('.rc-calendar-range-left .rc-calendar-cell').at(20).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/18/2017 06:59:59');
    });

    it('should combine disabledTime', () => {
      function newArray(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      }
      function disabledTime(time, type) {
        if (type === 'start') {
          return {
            disabledHours() {
              const hours = newArray(0, 60);
              hours.splice(20, 4);
              return hours;
            },
            disabledMinutes(h) {
              if (h === 20) {
                return newArray(0, 31);
              } else if (h === 23) {
                return newArray(30, 60);
              }
              return [];
            },
            disabledSeconds() {
              return [55, 56];
            },
          };
        }
        return {
          disabledHours() {
            const hours = newArray(0, 60);
            hours.splice(2, 6);
            return hours;
          },
          disabledMinutes(h) {
            if (h === 20) {
              return newArray(0, 31);
            } else if (h === 23) {
              return newArray(30, 60);
            }
            return [];
          },
          disabledSeconds() {
            return [55, 56];
          },
        };
      }
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} disabledTime={disabledTime}/>);

      wrapper.find('.rc-calendar-today').at(0).simulate('click').simulate('click');
      wrapper.find('.rc-calendar-today').at(0).simulate('click').simulate('click');
      // use timePicker's defaultValue if users haven't select a time
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 00:00:00');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 23:59:59');

      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');

      // update time to timePicker's time
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(0).find('li').at(23).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 23:00:00');
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(1).find('li').at(25).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 23:25:00');
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(2).find('li').at(3).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 23:25:03');

      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(1).find('li').at(25).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 23:25:59');

      const disabledTimeElements = wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(2).find('.rc-time-picker-panel-select-option-disabled');
      const disabledTimeValus = disabledTimeElements.map(item => item.text());
      expect(disabledTimeValus).toEqual(['00', '01', '02', '55', '56']);
    });

    it('works fine when select reversely', () => {
      // see: https://github.com/ant-design/ant-design/issues/6440
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} />);
      wrapper.find('.rc-calendar-cell').at(20).simulate('click');
      wrapper.find('.rc-calendar-cell').at(10).simulate('click');
      // It can only be re-produced at second time.
      wrapper.find('.rc-calendar-cell').at(20).simulate('click');
      wrapper.find('.rc-calendar-cell').at(10).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/8/2017 00:00:00');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/18/2017 23:59:59');
    });
  });

  describe('controlled panels', () => {
    it('render controlled panels correctly', () => {
      const RangeMonthPicker = mount(<RangeCalendar mode={['month', 'month']} />);
      expect(RangeMonthPicker.render()).toMatchSnapshot();
      RangeMonthPicker.find('.rc-calendar-month-panel-year-select').at(0).simulate('click');
      RangeMonthPicker.find('.rc-calendar-month-panel-year-select').at(1).simulate('click');
      expect(RangeMonthPicker.find('.rc-calendar-year-panel').length).toBe(0);
      expect(RangeMonthPicker.find('.rc-calendar-month-panel').length).toBe(2);

      const RangeYearPicker = mount(<RangeCalendar mode={['year', 'year']} />);
      expect(RangeYearPicker.render()).toMatchSnapshot();
      RangeYearPicker.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      RangeYearPicker.find('.rc-calendar-year-panel-decade-select').at(1).simulate('click');
      expect(RangeYearPicker.find('.rc-calendar-decade-panel').length).toBe(0);
      expect(RangeYearPicker.find('.rc-calendar-year-panel').length).toBe(2);
    });

    it('support controlled mode', () => {
      let value = null;
      class ControlledRangeCalendar extends React.Component {
        state = { mode: ['date', 'date'] };

        handlePanelChange = (v, mode) => {
          value = v;
          this.setState({ mode });
        }

        render() {
          return <RangeCalendar mode={this.state.mode} onPanelChange={this.handlePanelChange} />;
        }
      }
      const wrapper = mount(<ControlledRangeCalendar />);

      wrapper.find('.rc-calendar-month-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-month-select').at(1).simulate('click');
      expect(wrapper.find('.rc-calendar-month-panel').length).toBe(2);
      wrapper.find('.rc-calendar-month-panel-year-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-month-panel-year-select').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(2);
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(2);
      expect(value[0].isSame(moment(), 'day')).toBe(true);
      expect(value[1].isSame(moment().add(1, 'month'), 'day')).toBe(true);
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(0);
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(0);
      wrapper.find('.rc-calendar-month-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-month-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-month-panel').length).toBe(0);
      expect(value[0].isSame(moment('2010-03-29'), 'day')).toBe(true);
      expect(value[1].isSame(moment('2010-04-29'), 'day')).toBe(true);

      wrapper.find('.rc-calendar-year-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-select').at(1).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(2);
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(2);
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(0);
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(0);
    });

    it('controlled value works correctly', () => {
      const wrapper = mount(<RangeCalendar value={[moment(), moment()]} />);
      const initialValue = wrapper.state('value');
      expect(initialValue[0].add(1, 'month').isSame(initialValue[1], 'month')).toBe(true);

      wrapper.setProps({ value: [moment(), moment()] });
      const updatedValue = wrapper.state('value');
      expect(updatedValue[0].add(1, 'month').isSame(updatedValue[1], 'month')).toBe(true);
    });
  });

  it('can hide date inputs with showDateInput={false}', () => {
    const wrapper = render(<RangeCalendar showDateInput={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
