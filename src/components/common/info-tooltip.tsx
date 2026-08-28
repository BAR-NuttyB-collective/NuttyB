import React from 'react';

import { Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

import styles from './info-tooltip.module.css';

interface InfoTooltipProps {
    label: React.ReactNode;
    children?: React.ReactNode;
    /** Tooltip width in px, defaults to 240. */
    w?: number;
    /** Tooltip position, defaults to 'top'. */
    position?: 'bottom' | 'left' | 'right' | 'top';
    /** Whether to render the default info icon as the trigger. */
    showIcon?: boolean;
    /** Delay before opening on hover, in ms. */
    openDelay?: number;
    className?: string;
}

/**
 * Standard styled tooltip for explanations.
 *
 * Defaults to an info-icon trigger; pass children (and showIcon={false})
 * to attach the tooltip to custom content instead.
 */
export const InfoTooltip: React.FC<InfoTooltipProps> = ({
    label,
    children,
    w = 240,
    position = 'top',
    showIcon = true,
    openDelay,
    className,
}) => {
    const trigger =
        showIcon || !children ? (
            <span className={styles.infoIcon}>
                <IconInfoCircle size={14} />
            </span>
        ) : (
            children
        );

    return (
        <Tooltip
            label={label}
            multiline
            w={w}
            withArrow
            transitionProps={{ transition: 'pop', duration: 150 }}
            events={{ hover: true, focus: true, touch: true }}
            bg='var(--mantine-color-dark-8)'
            c='var(--mantine-color-dark-0)'
            bd='1px solid var(--mantine-primary-color-filled)'
            radius='md'
            p='xs'
            position={position}
            openDelay={openDelay}
            className={className}
        >
            {trigger}
        </Tooltip>
    );
};
