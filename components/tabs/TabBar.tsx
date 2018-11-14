import * as React from 'react';
import Icon from '../icon';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import classNames from 'classnames';
import { TabsProps } from './index';

export default class TabBar extends React.Component<TabsProps> {
  render() {
    const {
      tabBarStyle,
      animated = true,
      renderTabBar,
      tabBarExtraContent,
      tabPosition,
      prefixCls,
      className,
      size,
      type = 'line',
    } = this.props;
    const inkBarAnimated = typeof animated === 'object' ? animated.inkBar : animated;

    const isVertical = tabPosition === 'left' || tabPosition === 'right';
    const prevIconType = isVertical ? 'up' : 'left';
    const nextIconType = isVertical ? 'down' : 'right';
    const prevIcon = (
      <span className={`${prefixCls}-tab-prev-icon`}>
        <Icon type={prevIconType} className={`${prefixCls}-tab-prev-icon-target`} />
      </span>
    );
    const nextIcon = (
      <span className={`${prefixCls}-tab-next-icon`}>
        <Icon type={nextIconType} className={`${prefixCls}-tab-next-icon-target`} />
      </span>
    );

    // Additional className for style usage
    const cls: string = classNames(
      `${prefixCls}-${tabPosition}-bar`,
      {
        [`${prefixCls}-${size}-bar`]: !!size,
        [`${prefixCls}-card-bar`]: type.indexOf('card') >= 0,
      },
      className,
    );

    const renderProps = {
      ...this.props,
      inkBarAnimated,
      extraContent: tabBarExtraContent,
      style: tabBarStyle,
      prevIcon,
      nextIcon,
      className: cls,
    };

    let RenderTabBar: React.ReactElement<any>;

    if (renderTabBar) {
      RenderTabBar = renderTabBar(renderProps, ScrollableInkTabBar);
    } else {
      RenderTabBar = <ScrollableInkTabBar {...renderProps} />;
    }

    return React.cloneElement(RenderTabBar);
  }
}
