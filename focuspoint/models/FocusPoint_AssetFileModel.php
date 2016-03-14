<?php
namespace Craft;

class FocusPoint_AssetFileModel extends AssetFileModel
{
    protected function defineAttributes()
    {
        return array_merge(parent::defineAttributes(), array(
            'x' => AttributeType::Number,
            'y' => AttributeType::Number
        ));
    }

    public function getPctX()
    {
        return ((parent::getAttribute("x") + 1) / 2) * 100;
    }

    public function getPctY()
    {
        return ((parent::getAttribute("y") + 1) / 2) * 100;
    }
}