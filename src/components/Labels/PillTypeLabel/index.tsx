import React from 'react'
import PillTypeLabelStyles from './PillTypeLabel.styles';

interface IProps {
  type: string;
  bgColor: string;
}

const PillTypeLabel: React.FC<IProps> = ({
  type,
  bgColor = '#FFF'
}) => {
  return (
    <PillTypeLabelStyles bgColor={bgColor}>
      {type}
    </PillTypeLabelStyles>
  )
}

export default PillTypeLabel