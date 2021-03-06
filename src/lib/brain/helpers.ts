import { Vector3 } from "three";

import { SoundComponent } from "ecs/components/sound";

import { BrainContext } from "./brain-context";

/** Check if the head is looking at the laser. */
export const canSeeLaser = (context: BrainContext) => {
  if (!context.laser.getAttribute("visible")) return false;

  // Calculate heading to target
  context.targetHeading
    .copy(context.laser.object3D.position)
    .sub(context.el.object3D.position)
    .normalize();

  // Normalize head direction
  context.head.object3D.getWorldDirection(context.headDirection).normalize();

  // Get the angle between the sight line and the heading.
  const dot = context.headDirection.dot(context.targetHeading);

  // 1 is 0 degrees, 0 is 90 degrees.
  return dot > 0.6;
};

export const lookAtLaser = ({ head, laser }: BrainContext) => {
  head.object3D.lookAt(laser.object3D.position);
};

/** Is the robot close to a point? */
export const closeToPoint = (
  context: BrainContext,
  position: Vector3,
  distance: number = 1
): boolean => {
  return context.el.object3D.position.distanceTo(position) < distance;
};

export const faceToward = (context: BrainContext, position: Vector3) => {
  const levelPosition = positionToPlane(context, position);

  context.el.object3D.lookAt(levelPosition);
  context.head.object3D.lookAt(position);
};

export const moveToward = (
  context: BrainContext,
  position: Vector3,
  speed: number,
  delta: number
) => {
  const levelPosition = positionToPlane(context, position);
  context.el.object3D.lookAt(levelPosition);

  // Move forward
  context.el.object3D.translateZ(speed * (delta / 1000));
};

export const startMotorSound = (context: BrainContext) => {
  const motorSound = context.el?.components["sound__motor"] as SoundComponent;
  motorSound?.playSound();
};

export const stopMotorSound = (context: BrainContext) => {
  const motorSound = context.el?.components["sound__motor"] as SoundComponent;
  motorSound?.stopSound();
};

/** Pick a random integer. */
export const random = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min));
};

export const positionToPlane = (
  context: BrainContext,
  position: Vector3
): Vector3 => {
  return context.targetPosition.copy(position).setY(0.1);
};

export const getPlayerPosition = (context: BrainContext): Vector3 => {
  return context.player.object3D.getWorldPosition(context.playerPosition);
};
