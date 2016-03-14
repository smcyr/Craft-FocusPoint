<?php
namespace Craft;

class FocusPoint_FocusPointService extends BaseApplicationComponent
{
    public function getFocusPoint($assetId, $fieldId, $sourceId)
    {
        $db_record = FocusPoint_FocusPointRecord::model()->findByAttributes(array(
            "assetId" => $assetId,
            "fieldId" => $fieldId,
            "sourceId" => $sourceId
        ));
        return FocusPoint_FocusPointModel::populateModel($db_record);
    }

    public function getAllFocusPoints($fieldId, $sourceId)
    {
        $records = FocusPoint_FocusPointRecord::model()->findAllByAttributes(array(
            "fieldId" => $fieldId,
            "sourceId" => $sourceId
        ));
        return FocusPoint_FocusPointModel::populateModels($records);
    }

    public function createOrUpdateFocusPoint($x, $y, $assetId, $fieldId, $sourceId)
    {
        $db_record = FocusPoint_FocusPointRecord::model()->findByAttributes(array(
            "assetId" => $assetId,
            "fieldId" => $fieldId,
            "sourceId" => $sourceId
        ));
        if ($db_record != null) {
            $db_record->x = $x;
            $db_record->y = $y;
            $db_record->save();
        } else {
            $focusPoint = new FocusPoint_FocusPointRecord();
            $focusPoint->x = $x;
            $focusPoint->y = $y;
            $focusPoint->assetId = $assetId;
            $focusPoint->fieldId = $fieldId;
            $focusPoint->sourceId = $sourceId;
            $focusPoint->save();
        }
    }

    public function deleteFocusPointRecordsByFieldIdAndSourceId($fieldId, $sourceId)
    {
        $records = FocusPoint_FocusPointRecord::model()->findAllByAttributes(array(
            "fieldId" => $fieldId,
            "sourceId" => $sourceId
        ));
        foreach ($records as $record) {
            $record->delete();
        }
    }

    public function deleteFocusPointRecordsByFieldId($fieldId)
    {
        $records = FocusPoint_FocusPointRecord::model()->findAllByAttributes(array(
            "fieldId" => $fieldId
        ));
        foreach ($records as $record) {
            $record->delete();
        }
    }

    public function deleteFocusPointRecordsBySourceId($sourceId)
    {
        $records = FocusPoint_FocusPointRecord::model()->findAllByAttributes(array(
            "sourceId" => $sourceId
        ));
        foreach ($records as $record) {
            $record->delete();
        }
    }
}