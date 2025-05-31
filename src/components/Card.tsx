import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

interface CardProps {
  to: string;
  emoji: string;
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({
  to,
  emoji,
  title,
  description,
}) => {
  return (
    <Link className="card-link" to={to}>
      <div className="card">
        <span className="card-emoji">{emoji}</span>
        <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};
